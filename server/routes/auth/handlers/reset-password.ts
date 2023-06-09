import assert from "assert";
import bcrypt from "bcryptjs";
import express from "express";
import prisma from "../../../prisma";
import ResetPasswordRequest from "../../../schemas/requests/auth/reset-password-request";
import ResetPasswordResponse from "../../../schemas/responses/auth/reset-password-response";
import Dictionary from "../../../types/Dictionary";

const resetPasswordHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, ResetPasswordResponse, ResetPasswordRequest>,
  res: express.Response<ResetPasswordResponse>
) => {
  const { email, code, password } = req.body;

  assert(email, "email is required");
  assert(code, "code is required");
  assert(password, "password is required");

  let user = await prisma.user.findUniqueOrThrow({ where: { email } });

  const resetPasswordToken = await prisma.resetPasswordToken.findUniqueOrThrow({
    where: { user_id: user.id },
  });

  const now = new Date();

  assert(
    resetPasswordToken.expires_at.getTime() >= now.getTime(),
    "email verification token has expired"
  );

  assert(resetPasswordToken.token === code, "invalid reset password token");

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  user = await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  await prisma.resetPasswordToken.deleteMany({
    where: { user_id: user.id },
  });

  res.status(200).json({ success: true });
};

export default resetPasswordHandler;
