import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ValidationException } from "./ValidationException";

const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationException) {
    let errors: Array<string> = [];

    error.errors.forEach((err) => {
      const { constraints } = err;
      errors.push(Object.values(constraints)[0]);
    });

    return res
      .status(422)
      .json({ message: "Validation error", errors: errors });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
    errors: ["Ocorreu um erro ao processar sua solicitação."],
  });
};

export default errorHandler;
