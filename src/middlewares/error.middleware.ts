import { NextFunction, Request, Response } from "express";

export default function ErrorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const httpStatus = 300;
  return res.status(httpStatus).send({
    status: httpStatus,
    message: err.message || "Internal server error",
  });
}
