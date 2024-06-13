/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `TaskResource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `TaskResource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskResource" ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TaskResource_path_key" ON "TaskResource"("path");
