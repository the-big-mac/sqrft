import assert from "assert";
import express from "express";
import sendMail from "../../../lib/mail-service";
import prisma from "../../../prisma";
import SendResetPasswordCodeRequest from "../../../schemas/requests/auth/send-reset-password-code-request";
import SendResetPasswordCodeResponse from "../../../schemas/responses/auth/send-reset-password-code-response";
import Dictionary from "../../../types/Dictionary";

const sendResetPasswordCodeHandler: express.RequestHandler = async (
  req: express.Request<
    Dictionary,
    SendResetPasswordCodeResponse,
    SendResetPasswordCodeRequest
  >,
  res
) => {
  const { email } = req.body;

  assert(email, "email is required");

  const user = await prisma.user.findUniqueOrThrow({ where: { email } });

  await prisma.resetPasswordToken.deleteMany({
    where: { user_id: user.id },
  });

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  const now = new Date();
  const expirationMilliseconds = 10 * 60 * 1000; // 10 minutes

  const expiresAt = new Date(now.getTime() + expirationMilliseconds);

  const resetPasswordToken = await prisma.resetPasswordToken.create({
    data: { token, expires_at: expiresAt, user_id: user.id },
  });

  await sendMail(
    user.email,
    "Reset Your Sqrft Password",
    `<p>Hey, <b>${user.name}</b>,<br />We received a request to reset your password.!<br />Just to make sure that it's you, please enter the following code on the app: <b>${resetPasswordToken.token}<b>.<br />If it wasn't you, you can safely ignore this email.<br /><br />Thanks,<br /><b>Team Sqrft</b>.`
  );

  res.status(200).json({ success: true });
};

export default sendResetPasswordCodeHandler;
