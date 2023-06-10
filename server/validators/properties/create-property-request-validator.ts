import { BuildingType, PropertyType } from "@prisma/client";
import assert from "assert";
import express from "express";
import CreatePropertyRequest from "../../schemas/requests/properties/create-property-request";
import CreatePropertyResponse from "../../schemas/responses/properties/create-property-response";
import Dictionary from "../../types/Dictionary";

const createPropertyRequestValidator = (
  req: express.Request<
    Dictionary,
    CreatePropertyResponse,
    CreatePropertyRequest
  >
) => {
  const body = req.body;

  assert(body.saleType, "sale type is required");
  assert(body.buildingType, "building type is required");
  assert(body.propertyType, "property type is required");
  assert(body.propertyImages, "property images are required");
  assert(body.propertyName, "property name is required");
  assert(body.floor, "floor is required");
  assert(body.totalFloors, "total floors is required");
  assert(body.area, "area is required");
  assert(body.price, "price is required");
  assert(body.possessionStatus, "possession status is required");
  assert(body.furnishingStatus, "furnishing status is required");
  assert(body.parkingCount, "parking count is required");
  assert(body.ageOfProperty, "age of property is required");
  assert(body.location, "location is required");
  assert(body.amenities, "amenities are required");

  if (body.buildingType === BuildingType.RESIDENTIAL) {
    assert(body.roomCount, "room count is required");
    assert(body.bathroomCount, "bathroom count is required");

    assert(
      body.propertyType === PropertyType.APARTMENT ||
        body.propertyType === PropertyType.HOUSE,
      "property type must be apartment or house"
    );
  }

  if (body.buildingType === BuildingType.COMMERCIAL) {
    assert(body.officeSpaceType, "office space type is required");
    assert(body.pantryType, "pantry type is required");

    assert(
      body.propertyType === PropertyType.OFFICE_SPACE ||
        body.propertyType === PropertyType.SHOP ||
        body.propertyType === PropertyType.SHOWROOM ||
        body.propertyType === PropertyType.WAREHOUSE,
      "property type must be office, shop, showroom or warehouse"
    );
  }

  assert(
    body.floor <= body.totalFloors,
    "floor cannot be greater than total floors"
  );
};

export default createPropertyRequestValidator;
