export const S3_CLIENT = Symbol('S3_CLIENT');

type S3DirConfig =
  { path: string; isPublic: true } | { path: string; isPublic: false; ttl: number };

export const S3_DIRS = {
  AVATARS: { path: 'avatars', isPublic: true },
  SESSION_PUBLIC_FILES: { path: 'session_public', isPublic: true },
  SESSION_PRIVATE_FILES: { path: 'session_private', isPublic: false, ttl: 120 },
} as const satisfies Record<string, S3DirConfig>;

export type S3DirKey = keyof typeof S3_DIRS;

/** Paths marked as public. Used to build bucket read policy on startup. */
export const S3_PUBLIC_PREFIXES = Object.values(S3_DIRS)
  .filter((d) => d.isPublic)
  .map((d) => d.path);
