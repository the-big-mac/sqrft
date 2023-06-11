import express from "express";
import expressAsyncHandler from "express-async-handler";
import verifyTokenHandler from "../../middlewares/verify-token";
import createPropertyHandler from "./handlers/create-property";
import deletePropertyHandler from "./handlers/delete-property";
import listPropertiesHandler from "./handlers/list-properties";
import propertyDetailsByIdHandler from "./handlers/property-details-by-id";
import updatePropertyHandler from "./handlers/update-property";

const propertiesRouter = express.Router();

propertiesRouter.post(
  "/",
  verifyTokenHandler,
  expressAsyncHandler(createPropertyHandler)
);
propertiesRouter.put(
  "/:id",
  verifyTokenHandler,
  expressAsyncHandler(updatePropertyHandler)
);
propertiesRouter.delete(
  "/:id",
  verifyTokenHandler,
  expressAsyncHandler(deletePropertyHandler)
);
propertiesRouter.get(
  "/",
  verifyTokenHandler,
  expressAsyncHandler(listPropertiesHandler)
);
propertiesRouter.get(
  "/:id",
  verifyTokenHandler,
  expressAsyncHandler(propertyDetailsByIdHandler)
);

export default propertiesRouter;
