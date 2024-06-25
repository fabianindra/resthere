-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `proof` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'waiting payment';
