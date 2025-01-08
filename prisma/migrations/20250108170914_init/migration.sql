/*
  Warnings:

  - You are about to drop the column `categoryId` on the `CategoryClosure` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryClosure" DROP CONSTRAINT "CategoryClosure_categoryId_fkey";

-- AlterTable
ALTER TABLE "CategoryClosure" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "CategoryClosure" ADD CONSTRAINT "CategoryClosure_ancestorId_fkey" FOREIGN KEY ("ancestorId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryClosure" ADD CONSTRAINT "CategoryClosure_descendantId_fkey" FOREIGN KEY ("descendantId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
