/*
  Warnings:

  - You are about to drop the column `Symbol` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the `Nft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserNfts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `symbol` to the `Coin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserNfts" DROP CONSTRAINT "_UserNfts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserNfts" DROP CONSTRAINT "_UserNfts_B_fkey";

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "Symbol",
ADD COLUMN     "symbol" TEXT NOT NULL;

-- DropTable
DROP TABLE "Nft";

-- DropTable
DROP TABLE "_UserNfts";
