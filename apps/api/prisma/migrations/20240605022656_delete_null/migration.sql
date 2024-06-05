/*
  Warnings:

  - Made the column `tenant_id` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `property_id` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `property_id` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Property` DROP FOREIGN KEY `Property_tenant_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_property_id_fkey`;

-- DropForeignKey
ALTER TABLE `Room` DROP FOREIGN KEY `Room_property_id_fkey`;

-- AlterTable
ALTER TABLE `Property` MODIFY `tenant_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Review` MODIFY `property_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Room` MODIFY `property_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_tenant_id_fkey` FOREIGN KEY (`tenant_id`) REFERENCES `Tenant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
