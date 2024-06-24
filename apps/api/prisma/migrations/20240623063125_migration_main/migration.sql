/*
  Warnings:

  - You are about to drop the column `uupdatedAt` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `brithday` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `uupdatedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `brithday`,
    DROP COLUMN `foto`,
    DROP COLUMN `gender`;
