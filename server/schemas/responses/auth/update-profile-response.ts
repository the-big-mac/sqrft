import { User } from "@prisma/client";

interface UpdateProfileResponse {
  updatedUser: User;
}

export default UpdateProfileResponse;
