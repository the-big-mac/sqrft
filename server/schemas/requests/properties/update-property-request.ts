import {
  BuildingType,
  FurnishingStatus,
  OfficeSpaceType,
  PantryType,
  PossessionStatus,
  PropertyType,
  SaleType,
} from "@prisma/client";

interface UpdatePropertyRequest {
  propertyImages: string[] | undefined;
  propertyName: string | undefined;
  roomCount: number | undefined;
  bathroomCount: number | undefined;
  floor: number | undefined;
  totalFloors: number | undefined;
  area: number | undefined;
  price: number | undefined;
  possessionStatus: PossessionStatus | undefined;
  furnishingStatus: FurnishingStatus | undefined;
  officeSpaceType: OfficeSpaceType | undefined;
  pantryType: PantryType | undefined;
  parkingCount: number | undefined;
  ageOfProperty: number | undefined;
  amenities: string[] | undefined;
}

export default UpdatePropertyRequest;
