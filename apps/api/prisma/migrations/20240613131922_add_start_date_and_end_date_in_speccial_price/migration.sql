/*
  Warnings:

  - You are about to drop the column `date` on the `specialprice` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `SpecialPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `SpecialPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `specialprice` DROP COLUMN `date`,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL;
