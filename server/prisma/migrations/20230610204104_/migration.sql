/*
  Warnings:

  - You are about to drop the column `location_id` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[property_id]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_user_id_fkey";

-- DropIndex
DROP INDEX "Property_location_id_key";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "property_id" STRING;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "location_id";

-- CreateIndex
CREATE UNIQUE INDEX "Location_property_id_key" ON "Location"("property_id");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
