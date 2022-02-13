import { Controller } from "@/infrastructure/interfaces";
import { Router } from "express";
export default function userRoutes(UserController: Controller) {
  const router = Router();
  router.get("/:userId", (...args) => UserController.get(...args));
  router.get("", (...args) => UserController.getAll(...args));
  router.post("", (...args) => UserController.create(...args));
  router.patch("/:userId", (...args) => UserController.update(...args));
  router.delete("/:userId", (...args) => UserController.delete(...args));

  return router;
}
