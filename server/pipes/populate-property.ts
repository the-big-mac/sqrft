import populateUser from "./populate-user";

const populateProperty = {
  include: {
    location: { include: { country: true } },
    amenities: true,
    user: { ...populateUser },
  },
};

export default populateProperty;
