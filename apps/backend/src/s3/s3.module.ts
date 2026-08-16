import { Global, Inject, Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketPolicyCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import type { AppConfig } from '../config/configuration';
import { S3_CLIENT, S3_PUBLIC_PREFIXES } from './s3.constants';
import { S3Service } from './s3.service';

@Global()
@Module({
  providers: [
    {
      provide: S3_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig>) => {
        const s3Config = config.get('s3', { infer: true });
        return new S3Client({
          endpoint: s3Config?.endpoint,
          region: s3Config?.region,
          credentials: {
            accessKeyId: s3Config!.accessKeyId,
            secretAccessKey: s3Config!.secretAccessKey,
          },
          forcePathStyle: s3Config?.forcePathStyle,
        });
      },
    },
    S3Service,
  ],
  exports: [S3Service],
})
export class S3Module implements OnApplicationBootstrap {
  private readonly logger = new Logger(S3Module.name);

  constructor(
    @Inject(S3_CLIENT) private readonly client: S3Client,
    private readonly config: ConfigService<AppConfig>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const bucket = this.config.get('s3.bucket', { infer: true })!;

    const bucketExists = await this.client
      .send(new HeadBucketCommand({ Bucket: bucket }))
      .then(() => true)
      .catch(() => false);

    if (!bucketExists) {
      await this.client.send(new CreateBucketCommand({ Bucket: bucket }));
      this.logger.log(`Bucket "${bucket}" created`);
    }

    // Allow public read only for prefixes marked as public. Everything else stays private.
    const policy = JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: S3_PUBLIC_PREFIXES.map((prefix) => `arn:aws:s3:::${bucket}/${prefix}/*`),
        },
      ],
    });

    await this.client.send(new PutBucketPolicyCommand({ Bucket: bucket, Policy: policy }));

    this.logger.log(`Bucket "${bucket}" is ready`);
  }
}
