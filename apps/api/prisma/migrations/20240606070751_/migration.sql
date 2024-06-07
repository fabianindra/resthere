/*
  Warnings:

  - You are about to drop the column `available_room` on the `room` table. All the data in the column will be lost.
  - Added the required column `city_name` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province_name` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` ADD COLUMN `city_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `province_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `available_room`;
