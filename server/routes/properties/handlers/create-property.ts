import assert from "assert";
import express from "express";
import populateProperty from "../../../pipes/populate-property";
import prisma from "../../../prisma";
import CreatePropertyRequest from "../../../schemas/requests/properties/create-property-request";
import CreatePropertyResponse from "../../../schemas/responses/properties/create-property-response";
import Dictionary from "../../../types/Dictionary";
import createPropertyRequestValidator from "../../../validators/properties/create-property-request-validator";

const createPropertyHandler: express.RequestHandler = async (
  req: express.Request<
    Dictionary,
    CreatePropertyResponse,
    CreatePropertyRequest
  >,
  res: express.Response<CreatePropertyResponse>
) => {
  const { userId } = req.cookies;

  assert(userId, "user id is required");

  createPropertyRequestValidator(req);

  const body = req.body;

  const property = await prisma.property.create({
    data: {
      sale_type: body.saleType,
      building_type: body.buildingType,
      property_type: body.propertyType,
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
      location: {
        create: {
          address_one: body.location.addressOne,
          address_two: body.location.addressTwo,
          city: body.location.city,
          region: body.location.region,
          country_id: body.location.countryId,
          pincode: body.location.pincode,
          latitude: body.location.latitude,
          longitude: body.location.longitude,
        },
      },
      amenities: {
        connect: body.amenities.map((amenityId) => ({ id: amenityId })),
      },
      user: { connect: { id: userId } },
    },
    ...populateProperty,
  });

  res.status(201).json({ property });
};

export default createPropertyHandler;
