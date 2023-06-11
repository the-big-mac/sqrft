import express from "express";
import populateProperty from "../../../pipes/populate-property";
import prisma from "../../../prisma";
import Dictionary from "../../../types/Dictionary";

const propertyDetailsByIdHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, any, any>,
  res: express.Response<any>
) => {
  const propertyId = req.params.id;

  const property = await prisma.property.findUniqueOrThrow({
    where: { id: propertyId },
    ...populateProperty,
  });

  res.status(200).json({ property });
};

export default propertyDetailsByIdHandler;
