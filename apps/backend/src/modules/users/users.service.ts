import { Injectable } from '@nestjs/common';
import type { UserResponse } from '@ip/shared/src/interfaces/interfaces';
import { PrismaService } from '../../database/prisma.service';
import { S3Service } from '../../s3/s3.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service,
  ) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarKey ? this.s3.getPublicUrl(user.avatarKey) : null,
      createdAt: user.createdAt.toISOString(),
    }));
  }
}
