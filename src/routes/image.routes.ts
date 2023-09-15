import ImageController from "@/controllers/image.controller";
import { Router } from "express";
export default function imageRoutes(ImageController: ImageController) {
  const router = Router();
  router.post("", (...args) => ImageController.create(...args));
  router.delete("/:key", (...args) => ImageController.delete(...args));
  router.get("/:Id", (...args) => ImageController.get(...args));
  router.get("", (...args) => ImageController.getAll(...args));

  return router;
}
