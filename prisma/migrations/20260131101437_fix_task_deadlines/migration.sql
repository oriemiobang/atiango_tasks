/*
  Warnings:

  - You are about to drop the column `dateline` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dateline",
ADD COLUMN     "deadline" TIMESTAMP(3);
