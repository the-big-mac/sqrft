import assert from "assert";
import express from "express";
import prisma from "../../../prisma";
import DeletePropertyResponse from "../../../schemas/responses/properties/delete-property-response";
import Dictionary from "../../../types/Dictionary";

const deletePropertyHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, DeletePropertyResponse, any>,
  res: express.Response<DeletePropertyResponse>
) => {
  const { userId } = req.cookies;

  assert(userId, "user id is required");

  const propertyId = req.params.id;

  let property = await prisma.property.findUniqueOrThrow({
    where: { id: propertyId },
  });

  assert(property.user_id == userId, "you are not the owner of this property");

  await prisma.property.deleteMany({ where: { id: propertyId } });

  res.status(200).json({ success: true });
};

export default deletePropertyHandler;
