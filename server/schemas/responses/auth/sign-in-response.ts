import { User } from "@prisma/client";

interface SignInResponse {
  token: string;
  user: User;
}

export default SignInResponse;
