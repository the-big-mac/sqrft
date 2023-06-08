import assert from "assert";
import bcrypt from "bcryptjs";
import express from "express";
import sendMail from "../../../lib/mail-service";
import prisma from "../../../prisma";
import SignUpRequest from "../../../schemas/requests/auth/sign-up-request";
import SignInResponse from "../../../schemas/responses/auth/sign-in-response";
import Dictionary from "../../../types/Dictionary";

const signUpHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, SignInResponse, SignUpRequest>,
  res
) => {
  const { name, email, password } = req.body;

  assert(name, "name is required");
  assert(email, "email is required");
  assert(password, "password is required");

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  await prisma.emailVerificationToken.deleteMany({
    where: { user_id: user.id },
  });

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  const now = new Date();
  const expirationMilliseconds = 10 * 60 * 1000; // 10 minutes

  const expiresAt = new Date(now.getTime() + expirationMilliseconds);

  const emailVerificationToken = await prisma.emailVerificationToken.create({
    data: { token, expires_at: expiresAt, user_id: user.id },
  });

  await sendMail(
    user.email,
    "Verify Your Sqrft Account",
    `<p>Hey, <b>${user.name}</b>,<br />We are pleased to have you onboard with us!<br />Just to make sure that it's you, please verify your email address by entering the following code on the app: <b>${emailVerificationToken.token}<b>.<br /><br />Thanks,<br /><b>Team Sqrft</b>.`
  );

  res.status(200).json({ success: true });
};

export default signUpHandler;
