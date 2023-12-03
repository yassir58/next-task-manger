/*
  Warnings:

  - Made the column `image` on table `workspaces` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visibility` on table `workspaces` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "workspaces" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "visibility" SET NOT NULL;
