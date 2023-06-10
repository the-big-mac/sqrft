/*
  Warnings:

  - You are about to drop the column `property_id` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[location_id]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location_id` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_property_id_fkey";

-- DropIndex
DROP INDEX "Location_property_id_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "property_id";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "location_id" STRING NOT NULL;
ALTER TABLE "Property" ADD COLUMN     "user_id" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_location_id_key" ON "Property"("location_id");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
