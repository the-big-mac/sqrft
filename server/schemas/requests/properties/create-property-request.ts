import {
  BuildingType,
  FurnishingStatus,
  OfficeSpaceType,
  PantryType,
  PossessionStatus,
  PropertyType,
  SaleType,
} from "@prisma/client";

export interface _PropertyLocation {
  addressOne: string;
  addressTwo: string | undefined;
  city: string;
  region: string | undefined;
  countryId: string;
  pincode: string | undefined;
  latitude: number;
  longitude: number;
  userId: string;
}

interface CreatePropertyRequest {
  saleType: SaleType;
  buildingType: BuildingType;
  propertyType: PropertyType;
  propertyImages: string[];
  propertyName: string;
  roomCount: number | undefined;
  bathroomCount: number | undefined;
  floor: number;
  totalFloors: number;
  area: number;
  price: number;
  possessionStatus: PossessionStatus;
  furnishingStatus: FurnishingStatus;
  officeSpaceType: OfficeSpaceType | undefined;
  pantryType: PantryType | undefined;
  parkingCount: number;
  ageOfProperty: number;
  location: _PropertyLocation;
  amenities: string[];
}

export default CreatePropertyRequest;
