-- CreateTable
CREATE TABLE "credentials" (
    "user_id" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("user_id")
);

-- Move existing hashes (if users.password_hash already exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
      AND column_name = 'password_hash'
  ) THEN
    INSERT INTO "credentials" ("user_id", "password_hash", "created_at", "updated_at")
    SELECT "id", "password_hash", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    FROM "users"
    WHERE "password_hash" IS NOT NULL;

    ALTER TABLE "users" DROP COLUMN "password_hash";
  END IF;
END $$;

-- AddForeignKey
ALTER TABLE "credentials"
  ADD CONSTRAINT "credentials_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
