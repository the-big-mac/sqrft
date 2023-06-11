import assert from "assert";
import express from "express";
import populateProperty from "../../../pipes/populate-property";
import prisma from "../../../prisma";
import ListPropertiesResponse from "../../../schemas/responses/properties/list-properties-response";
import Dictionary from "../../../types/Dictionary";

const PROPERTIES_PER_PAGE = 10;

const listPropertiesHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, ListPropertiesResponse, any>,
  res: express.Response<ListPropertiesResponse>
) => {
  const { userId } = req.cookies;

  const page = parseInt((req.query.page as string) || "0");

  assert(userId, "user id is required");

  const properties = await prisma.property.findMany({
    where: { user_id: userId },
    take: PROPERTIES_PER_PAGE,
    skip: PROPERTIES_PER_PAGE * page,
    ...populateProperty,
  });

  const propertiesCount = await prisma.property.count({
    where: { user_id: userId },
  });
  const maxPageCount = Math.floor(propertiesCount / PROPERTIES_PER_PAGE);

  res.status(200).json({ properties, maxPageCount });
};

export default listPropertiesHandler;
