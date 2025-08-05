DROP TABLE "account" CASCADE;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "emailVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "gender";--> statement-breakpoint
DROP TYPE "public"."gender";--> statement-breakpoint
DROP TYPE "public"."role";