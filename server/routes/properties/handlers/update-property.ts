import assert from "assert";
import express from "express";
import populateProperty from "../../../pipes/populate-property";
import prisma from "../../../prisma";
import UpdatePropertyRequest from "../../../schemas/requests/properties/update-property-request";
import UpdatePropertyResponse from "../../../schemas/responses/properties/update-properties-response";
import Dictionary from "../../../types/Dictionary";
import updatePropertyRequestValidator from "../../../validators/properties/update-property-request-validator";

const updatePropertyHandler: express.RequestHandler = async (
  req: express.Request<
    Dictionary,
    UpdatePropertyResponse,
    UpdatePropertyRequest
  >,
  res: express.Response<UpdatePropertyResponse>
) => {
  const { userId } = req.cookies;

  assert(userId, "user id is required");

  const propertyId = req.params.id;
  const body = req.body;

  let property = await prisma.property.findUniqueOrThrow({
    where: { id: propertyId },
  });

  updatePropertyRequestValidator(req, property);

  assert(property.user_id == userId, "you are not the owner of this property");

  property = await prisma.property.update({
    where: { id: propertyId },
    data: {
      property_images: body.propertyImages,
      property_name: body.propertyName,
      room_count: body.roomCount,
      bathroom_count: body.bathroomCount,
      floor: body.floor,
      total_floors: body.totalFloors,
      area: body.area,
      price: body.price,
      possession_status: body.possessionStatus,
      furnishing_status: body.furnishingStatus,
      office_space_type: body.officeSpaceType,
      pantry_type: body.pantryType,
      parking_count: body.parkingCount,
      age_of_property: body.ageOfProperty,
      amenities: {
        set: body.amenities?.map((amenityId) => ({ id: amenityId })),
      },
    },
    ...populateProperty,
  });

  res.status(200).json({ updatedProperty: property });
};

export default updatePropertyHandler;
