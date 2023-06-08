import assert from "assert";
import express from "express";
import prisma from "../../../prisma";
import VerifyEmailRequest from "../../../schemas/requests/auth/verify-email-request";
import VerifyEmailResponse from "../../../schemas/responses/auth/verify-email-response";
import Dictionary from "../../../types/Dictionary";

const verifyEmailHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, VerifyEmailResponse, VerifyEmailRequest>,
  res
) => {
  const { email, code } = req.body;

  assert(email, "email is required");
  assert(code, "code is required");

  let user = await prisma.user.findUniqueOrThrow({ where: { email } });

  const emailVerificationToken =
    await prisma.emailVerificationToken.findUniqueOrThrow({
      where: { user_id: user.id },
    });

  const now = new Date();

  if (emailVerificationToken.expires_at.getTime() < now.getTime()) {
    throw new Error("email verification token has expired");
  }

  if (emailVerificationToken.token === code) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { is_verified: true },
    });

    await prisma.emailVerificationToken.deleteMany({
      where: { user_id: user.id },
    });

    res.status(200).json({ success: true });
  } else {
    throw new Error("invalid email verification token");
  }
};

export default verifyEmailHandler;
