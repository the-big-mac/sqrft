import dotenv from "dotenv";
import express from "express";
import logger from "./lib/logger";
import authRouter from "./routes/auth";
import GlobalErrorHandler from "./types/GlobalErrorHandler";

dotenv.config();

const { PORT = 8000 } = process.env;

const app = express();

// Register Middlewares
app.use(express.json());

app.get(`/api/v1/health`, (req, res) => {
  res.status(200).json({ message: "the server is up and running" });
});

// Register Routes
app.use("/api/v1/auth", authRouter);

const globalErrorHandler: GlobalErrorHandler = (error, req, res, next) => {
  logger.error(error);
  res.status(500).json({ error: error?.message || "Something went wrong." });
};

app.use(globalErrorHandler);

app.listen(PORT, () => logger.info(`server started at port: ${PORT}`));
