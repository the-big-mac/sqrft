import { BuildingType, Property } from "@prisma/client";
import assert from "assert";
import express from "express";
import UpdatePropertyRequest from "../../schemas/requests/properties/update-property-request";
import UpdatePropertyResponse from "../../schemas/responses/properties/update-properties-response";
import Dictionary from "../../types/Dictionary";

const updatePropertyRequestValidator = (
  req: express.Request<
    Dictionary,
    UpdatePropertyResponse,
    UpdatePropertyRequest
  >,
  currentProperty: Property
) => {
  const body = req.body;

  if (currentProperty.building_type === BuildingType.RESIDENTIAL) {
    assert(body.roomCount !== 0, "room count cannot be 0");
    assert(body.bathroomCount !== 0, "bathroom count cannot be 0");
  }

  assert(
    (body.floor || currentProperty.floor) <=
      (body.totalFloors || currentProperty.total_floors),
    "floor cannot be greater than total floors"
  );
};

export default updatePropertyRequestValidator;
