import assert from "assert";
import bcrypt from "bcryptjs";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import prisma from "../../../prisma";
import SignInRequest from "../../../schemas/requests/auth/sign-in-request";
import SignInResponse from "../../../schemas/responses/auth/sign-in-response";
import Dictionary from "../../../types/Dictionary";

const signInHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, SignInResponse, SignInRequest>,
  res
) => {
  const { email, password } = req.body;

  assert(email, "email is required");
  assert(password, "password is required");

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  if (!user.is_verified) {
    throw new Error("user is not verified");
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    throw new Error("invalid password");
  }

  const { JWT_SECRET } = process.env;

  assert(JWT_SECRET, "JWT_SECRET is required");

  const tokenPayload = { ...user };
  const token = jsonwebtoken.sign(tokenPayload, JWT_SECRET);

  res.status(200).json({ token, user });
};

export default signInHandler;
