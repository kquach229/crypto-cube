/*
  Warnings:

  - You are about to drop the column `image` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Coin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "symbol";
