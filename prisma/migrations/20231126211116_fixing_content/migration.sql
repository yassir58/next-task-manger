/*
  Warnings:

  - You are about to drop the column `conent` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `content` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "conent",
ADD COLUMN     "content" TEXT NOT NULL;
