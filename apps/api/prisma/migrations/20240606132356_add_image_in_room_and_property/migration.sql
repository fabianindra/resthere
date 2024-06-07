/*
  Warnings:

  - Added the required column `image` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` ADD COLUMN `image` VARCHAR(191) NOT NULL;
