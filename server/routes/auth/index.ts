import express from "express";
import expressAsyncHandler from "express-async-handler";
import resendVerificationCodeHandler from "./handlers/resend-verification-code";
import resetPasswordHandler from "./handlers/reset-password";
import sendResetPasswordCodeHandler from "./handlers/send-reset-password-code";
import signInHandler from "./handlers/sign-in";
import signUpHandler from "./handlers/sign-up";
import verifyEmailHandler from "./handlers/verify-email";

const authRouter = express.Router();

authRouter.post("/sign-up", expressAsyncHandler(signUpHandler));
authRouter.post(
  "/resend-verification-code",
  expressAsyncHandler(resendVerificationCodeHandler)
);
authRouter.put("/verify-email", expressAsyncHandler(verifyEmailHandler));
authRouter.post(
  "/send-reset-password-code",
  expressAsyncHandler(sendResetPasswordCodeHandler)
);
authRouter.put("/reset-password", expressAsyncHandler(resetPasswordHandler));
authRouter.post("/sign-in", expressAsyncHandler(signInHandler));

export default authRouter;
