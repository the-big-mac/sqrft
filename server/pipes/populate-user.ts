const populateUser = {
  include: { location: { include: { country: true } } },
};

export default populateUser;
