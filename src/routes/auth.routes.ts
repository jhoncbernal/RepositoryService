import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";
export default function authRoutes(AuthController: AuthController) {
  const router = Router();
  router.get("/:Id", (...args) => AuthController.get(...args));
  router.get("", (...args) => AuthController.getAll(...args));
  router.post("", (...args) => AuthController.create(...args));
  router.patch("/:Id", (...args) => AuthController.update(...args));
  router.delete("/:Id", (...args) => AuthController.delete(...args));
  router.post("/signup", (...args) => AuthController.signup(...args));
  router.post("/signin", (...args) => AuthController.signin(...args));
  router.post("/recover-password", (...args) =>
    AuthController.recoverPassword(...args)
  );
  router.post("/register-provider", (...args) =>
    AuthController.registerProvider(...args)
  );

  return router;
}
