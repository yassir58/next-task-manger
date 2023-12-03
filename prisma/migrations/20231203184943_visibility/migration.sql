/*
  Warnings:

  - Added the required column `coverImage` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "coverImage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "workspaces" ADD COLUMN     "visibility" TEXT;
