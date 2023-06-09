interface _UserLocation {
  addressOne: string;
  addressTwo: string | undefined;
  city: string;
  region: string | undefined;
  countryId: string;
  pincode: string | undefined;
  latitude: number;
  longitude: number;
}

interface UpdateProfileRequest {
  name: string | undefined;
  profilePicture: string | undefined;
  location: _UserLocation | undefined;
}

export default UpdateProfileRequest;
