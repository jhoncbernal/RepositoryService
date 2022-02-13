import express from "express";
import helmet from "helmet";
import ErrorMiddleware from "@/middlewares/error.middleware";
import { Controller } from "@/infrastructure/interfaces";
import userRoutes from "./user.routes";
export default function Router(UserController: Controller): express.Router {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(helmet());

  apiRoutes.use("/users", userRoutes(UserController));

  router.use("/api/v1", apiRoutes);

  router.use(ErrorMiddleware);

  return router;
}
