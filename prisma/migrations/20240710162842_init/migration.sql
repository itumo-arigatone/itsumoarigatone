/*
  Warnings:

  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `key` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "url",
ADD COLUMN     "key" TEXT NOT NULL;
