import { Property } from "@prisma/client";

interface ListPropertiesResponse {
  properties: Property[];
  maxPageCount: number;
}

export default ListPropertiesResponse;
