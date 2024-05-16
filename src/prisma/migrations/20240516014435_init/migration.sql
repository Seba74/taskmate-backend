/*
  Warnings:

  - You are about to drop the column `taskResourceId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `TaskResource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskResourceId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "taskResourceId";

-- AlterTable
ALTER TABLE "TaskResource" ADD COLUMN     "taskId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskResource" ADD CONSTRAINT "TaskResource_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
