-- CreateTable
CREATE TABLE "Attachement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "Attachement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachement" ADD CONSTRAINT "Attachement_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
