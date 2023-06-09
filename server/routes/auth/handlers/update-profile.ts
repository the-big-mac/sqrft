import assert from "assert";
import express from "express";
import populateUser from "../../../pipes/populate-user";
import prisma from "../../../prisma";
import UpdateProfileRequest from "../../../schemas/requests/auth/update-profile-request";
import UpdateProfileResponse from "../../../schemas/responses/auth/update-profile-response";
import Dictionary from "../../../types/Dictionary";

const updateProfileHandler: express.RequestHandler = async (
  req: express.Request<Dictionary, UpdateProfileResponse, UpdateProfileRequest>,
  res: express.Response<UpdateProfileResponse>
) => {
  const { userId } = req.cookies;

  const { name, profilePicture, location } = req.body;

  assert(userId, "userId is required");

  await prisma.user.updateMany({
    where: { id: userId },
    data: { name: name, profile_picture: profilePicture },
  });

  if (location) {
    await prisma.location.deleteMany({ where: { user_id: userId } });

    await prisma.location.create({
      data: {
        address_one: location.addressOne,
        address_two: location.addressTwo,
        city: location.city,
        region: location.region,
        country_id: location.countryId,
        pincode: location.pincode,
        latitude: location.latitude,
        longitude: location.longitude,
        user_id: userId,
      },
    });
  }

  const updatedUser = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    ...populateUser,
  });

  res.status(200).json({ updatedUser });
};

export default updateProfileHandler;
