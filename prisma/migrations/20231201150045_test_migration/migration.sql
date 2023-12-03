/*
  Warnings:

  - You are about to drop the column `userId` on the `boards` table. All the data in the column will be lost.
  - Added the required column `workspaceId` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "boards" DROP CONSTRAINT "boards_userId_fkey";

-- AlterTable
ALTER TABLE "boards" DROP COLUMN "userId",
ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profileImage" TEXT;

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
