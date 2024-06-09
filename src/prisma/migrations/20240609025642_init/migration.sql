/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `TaskResourceType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "project_picture" SET DEFAULT '0d1dc1a6338f.png';

-- CreateIndex
CREATE UNIQUE INDEX "TaskResourceType_description_key" ON "TaskResourceType"("description");
