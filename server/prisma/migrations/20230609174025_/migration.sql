/*
  Warnings:

  - A unique constraint covering the columns `[property_id]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('SALE', 'RENT');

-- CreateEnum
CREATE TYPE "BuildingType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'LAND');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT', 'HOUSE', 'OFFICE_SPACE', 'SHOWROOM', 'SHOP', 'WAREHOUSE');

-- CreateEnum
CREATE TYPE "PossessionStatus" AS ENUM ('READY_TO_MOVE', 'UNDER_CONSTRUCTION');

-- CreateEnum
CREATE TYPE "FurnishingStatus" AS ENUM ('FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED');

-- CreateEnum
CREATE TYPE "OfficeSpaceType" AS ENUM ('FITTED', 'SEMI_FITTED', 'CORE');

-- CreateEnum
CREATE TYPE "PantryType" AS ENUM ('ALL', 'WET', 'DRY', 'NONE');

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "property_id" STRING;

-- CreateTable
CREATE TABLE "Amenity" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" STRING NOT NULL,
    "sale_type" "SaleType" NOT NULL,
    "building_type" "BuildingType" NOT NULL,
    "property_type" "PropertyType",
    "property_images" STRING[],
    "property_name" STRING NOT NULL,
    "room_count" INT4,
    "bathroom_count" INT4,
    "floor" INT4 NOT NULL,
    "total_floors" INT4 NOT NULL,
    "area" FLOAT8 NOT NULL,
    "price" FLOAT8 NOT NULL,
    "possession_status" "PossessionStatus" NOT NULL,
    "furnishing_status" "FurnishingStatus" NOT NULL,
    "office_space_type" "OfficeSpaceType",
    "pantry_type" "PantryType",
    "parking_count" INT4 NOT NULL,
    "age_of_property" INT4 NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AmenityToProperty" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Property_property_name_key" ON "Property"("property_name");

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToProperty_AB_unique" ON "_AmenityToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToProperty_B_index" ON "_AmenityToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Location_property_id_key" ON "Location"("property_id");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToProperty" ADD CONSTRAINT "_AmenityToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToProperty" ADD CONSTRAINT "_AmenityToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
