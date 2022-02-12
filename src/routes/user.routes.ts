import { Controller } from "@/infrastructure/interfaces";
import { Router } from "express";
export default function userRoutes(UserController: Controller) {
  const router = Router();
  router.get("/:userId", (req, res) => {
    UserController.get(req, res);
  });
  router.get("", (req, res) => {
    UserController.getAll(req, res);
  });
  router.post("", (req, res) => {
    UserController.create(req, res);
  });
  router.patch("/:userId", (req, res) => {
    UserController.update(req, res);
  });
  router.delete("/:userId", (req, res) => {
    UserController.delete(req, res);
  });
  return router;
}
