import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsInt()
  @Min(1)
  PORT!: number;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  REDIS_URL!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  JWT_REFRESH_SECRET!: string;

  @IsString()
  @IsOptional()
  CORS_ORIGIN?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  JWT_ACCESS_EXPIRES_MS?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  JWT_REFRESH_EXPIRES_MS?: number;

  @IsString()
  S3_ENDPOINT!: string;

  @IsString()
  @IsOptional()
  S3_REGION?: string;

  @IsString()
  S3_ACCESS_KEY_ID!: string;

  @IsString()
  S3_SECRET_ACCESS_KEY!: string;

  @IsString()
  S3_BUCKET!: string;

  @IsString()
  S3_PUBLIC_URL!: string;

  @IsString()
  @IsOptional()
  S3_FORCE_PATH_STYLE?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
