import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { S3_CLIENT } from './s3.constants';

export interface UploadParams {
  key: string;
  body: Buffer | Uint8Array | string;
  contentType: string;
}

/**
 * Facade over AWS S3-compatible object storage.
 *
 * Key naming convention: `{S3_DIRS[X].path}/{uuid}.{ext}`
 * Example: `avatars/a3f8c2d1-9b4e-4f7a.jpg`
 *
 * Public vs private access is controlled by bucket policy applied at startup
 * (see S3Module.onApplicationBootstrap). Only prefixes with `isPublic: true`
 * in S3_DIRS are accessible via direct URL; everything else requires a presigned URL.
 *
 * Provider switch (MinIO -> Timeweb/Yandex): change env vars only, no code changes needed.
 * See S3_DIRS in s3.constants.ts for TTL values per content category.
 */
@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(
    @Inject(S3_CLIENT) private readonly client: S3Client,
    private readonly config: ConfigService<AppConfig>,
  ) {
    const s3Config = config.get('s3', { infer: true })!;
    this.bucket = s3Config.bucket;
    this.publicUrl = s3Config.publicUrl.replace('{bucket}', s3Config.bucket).replace(/\/$/, '');
  }

  /** Uploads a file to the bucket. Key should follow the `{prefix}/{uuid}.{ext}` convention. */
  async upload({ key, body, contentType }: UploadParams): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  /** Deletes a single object. Idempotent: silently succeeds if the object does not exist. */
  async deleteFile(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }

  /**
   * Deletes all objects under a prefix (simulates directory deletion).
   * Paginates automatically for large directories.
   */
  async deleteDirectory(prefix: string): Promise<void> {
    const normalizedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
    let continuationToken: string | undefined;

    do {
      const list = await this.client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: normalizedPrefix,
          ContinuationToken: continuationToken,
        }),
      );

      const objects = list.Contents?.map(({ Key }) => ({ Key })).filter((o): o is { Key: string } =>
        Boolean(o.Key),
      );

      if (objects?.length) {
        await this.client.send(
          new DeleteObjectsCommand({
            Bucket: this.bucket,
            Delete: { Objects: objects, Quiet: true },
          }),
        );
        this.logger.log(`Deleted ${objects.length} objects under ${normalizedPrefix}`);
      }

      continuationToken = list.IsTruncated ? list.NextContinuationToken : undefined;
    } while (continuationToken);
  }

  /**
   * Returns a temporary presigned URL for private objects.
   * The URL is valid for `ttl` seconds and grants read-only access without credentials.
   * Use TTL values from S3_DIRS (e.g. `S3_DIRS.SESSION_PRIVATE_FILES.ttl`).
   * Throws if the object does not exist.
   */
  async getSignedUrl(key: string, ttl: number): Promise<string> {
    if (!(await this.exists(key))) {
      throw new Error(`Object not found: ${key}`);
    }
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, command, { expiresIn: ttl });
  }

  /**
   * Returns a permanent public URL for objects in a publicly readable prefix.
   * Only valid for keys under prefixes with `isPublic: true` in S3_DIRS.
   * URL format is derived from S3_PUBLIC_URL env var with `{bucket}` substituted at startup.
   */
  getPublicUrl(key: string): string {
    return `${this.publicUrl}/${key}`;
  }

  /** Returns true if the object exists in the bucket. Uses a lightweight HEAD request. */
  async exists(key: string): Promise<boolean> {
    try {
      await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
      return true;
    } catch {
      return false;
    }
  }
}
