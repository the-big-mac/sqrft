import dotenv from "dotenv";
import express from "express";
import logger from "./lib/logger";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

// Register Middlewares
app.use(express.json());

app.get(`/api/v1/health`, (req, res) => {
  res.status(200).json({ message: "the server is up and running" });
});

app.listen(PORT, () => logger.info(`server started at port: ${PORT}`));
