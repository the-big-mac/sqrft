import express from "express";

type GlobalErrorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export default GlobalErrorHandler;
