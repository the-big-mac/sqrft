import assert from "assert";
import express from "express";
import sendMail from "../../../lib/mail-service";
import prisma from "../../../prisma";
import ResendVerificationCodeRequest from "../../../schemas/requests/auth/resend-verification-code-request";
import ResendVerificationCodeResponse from "../../../schemas/responses/auth/resend-verification-code-response";
import Dictionary from "../../../types/Dictionary";

const resendVerificationCodeHandler: express.RequestHandler = async (
  req: express.Request<
    Dictionary,
    ResendVerificationCodeResponse,
    ResendVerificationCodeRequest
  >,
  res
) => {
  const { email } = req.body;

  assert(email, "email is required");

  const user = await prisma.user.findUniqueOrThrow({ where: { email } });

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

export default resendVerificationCodeHandler;
