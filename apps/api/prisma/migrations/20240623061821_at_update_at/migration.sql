/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `review` table. All the data in the column will be lost.
  - Added the required column `uupdatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `updatedAt`,
    ADD COLUMN `uupdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ALTER COLUMN `updatedAt` DROP DEFAULT;
