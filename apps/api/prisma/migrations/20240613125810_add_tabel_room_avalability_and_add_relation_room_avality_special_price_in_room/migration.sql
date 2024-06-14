/*
  Warnings:

  - Added the required column `room_id` to the `SpecialPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `specialprice` ADD COLUMN `room_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `RoomAvailability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `room_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpecialPrice` ADD CONSTRAINT `SpecialPrice_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomAvailability` ADD CONSTRAINT `RoomAvailability_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
