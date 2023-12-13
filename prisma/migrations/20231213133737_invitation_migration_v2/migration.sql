/*
  Warnings:

  - You are about to drop the column `ownderId` on the `Invitation` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_ownderId_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "ownderId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
