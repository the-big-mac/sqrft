import dotenv from "dotenv";
import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import logger from "./lib/logger";
import authRouter from "./routes/auth";
import propertiesRouter from "./routes/properties";
import GlobalErrorHandler from "./types/GlobalErrorHandler";

dotenv.config();

const { PORT = 8000 } = process.env;

const app = express();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecifications = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sqrft API",
      version: "1.0.0",
      description: "Sqrft API Information",
      contact: {
        name: "Sqrft",
        url: "http://127.0.0.1:8000/api/v1/health",
        email: "contact.sqrft@gmail.com",
      },
    },
    servers: [{ url: "http://127.0.0.1:8000" }],
  },
  apis: ["./routes/*.ts"],
});

// Register Middlewares
app.use(express.json());

app.get(`/api/v1/health`, (req, res) => {
  res.status(200).json({ message: "the server is up and running" });
});

// Register Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/properties", propertiesRouter);

// Swagger
app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpecifications, { explorer: true })
);

const globalErrorHandler: GlobalErrorHandler = (error, req, res, next) => {
  logger.error(error);
  res.status(500).json({ error: error?.message || "Something went wrong." });
};

app.use(globalErrorHandler);

app.listen(PORT, () => logger.info(`server started at port: ${PORT}`));
