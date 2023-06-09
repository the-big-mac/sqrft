import { User } from "@prisma/client";
import assert from "assert";
import express from "express";
import jsonwebtoken from "jsonwebtoken";

const verifyTokenHandler: express.RequestHandler = (
  req: express.Request<any, any, any>,
  res: express.Response<any>,
  next
) => {
  const authorizationHeader = req.headers["authorization"];

  assert(authorizationHeader, "authorization header is required");

  const token = authorizationHeader.split(" ")[1];

  assert(token, "token is required");

  const { JWT_SECRET } = process.env;

  assert(JWT_SECRET, "JWT_SECRET is required");

  const isValidToken = jsonwebtoken.verify(token, JWT_SECRET) as User | null;

  assert(isValidToken, "token is invalid");

  req.cookies = { userId: isValidToken.id };

  next();
};

export default verifyTokenHandler;
