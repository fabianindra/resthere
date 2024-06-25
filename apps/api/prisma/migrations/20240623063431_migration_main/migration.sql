-- AlterTable
ALTER TABLE `transaction` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `birthday` DATETIME(3) NULL,
    ADD COLUMN `foto` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL;
