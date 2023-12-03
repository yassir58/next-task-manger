-- DropForeignKey
ALTER TABLE "boards" DROP CONSTRAINT "boards_workspaceId_fkey";

-- AlterTable
ALTER TABLE "boards" ALTER COLUMN "workspaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
