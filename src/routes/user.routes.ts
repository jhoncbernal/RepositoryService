import { Controller } from "@/infrastructure/interfaces";
import { Router } from "express";
export default function userRoutes(UserController: Controller) {
  const router = Router();
  router.get("/:Id", (...args) => UserController.get(...args));
  router.get("", (...args) => UserController.getAll(...args));
  router.post("", (...args) => UserController.create(...args));
  router.patch("/:Id", (...args) => UserController.update(...args));
  router.delete("/:Id", (...args) => UserController.delete(...args));

  return router;
}
