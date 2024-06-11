-- AlterTable
ALTER TABLE `Tenant` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
