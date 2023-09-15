import "reflect-metadata"; // This is required for InversifyJS
import { injectable, inject } from "inversify";
import express from "express";
import helmet from "helmet";
import ErrorMiddleware from "@/middlewares/error.middleware";
import { Controller } from "@/infrastructure/interfaces";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import { TYPES } from "@/infrastructure/types"; // Assuming you have a TYPES object for identifiers
import { AuthController } from "@/controllers/auth.controller";
import { ImageController } from "@/controllers/image.controller";
import cors from "cors";
import imageRoutes from "./image.routes";
import fileUpload from "express-fileupload";

@injectable()
export class AppRouter {
  private _router: express.Router;

  constructor(
    @inject(TYPES.UserController) private UserController: Controller,
    @inject(TYPES.AuthController) private AuthController: AuthController,
    @inject(TYPES.ImageController) private ImageController: ImageController
  ) {
    this._router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    const apiRoutes = express.Router();
    // Configure CORS
    const corsOptions = {
      origin: "http://localhost:3000", // Allow only this origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Allow cookies and sessions
      optionsSuccessStatus: 204,
    };

    this._router.use(cors(corsOptions));
    apiRoutes
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(helmet())
      .use(fileUpload());

    apiRoutes.use("/users", userRoutes(this.UserController));
    apiRoutes.use("/auth", authRoutes(this.AuthController));
    apiRoutes.use("/images", imageRoutes(this.ImageController));

    this._router.use("/api/v1", apiRoutes);
    this._router.use(ErrorMiddleware);
  }

  get router(): express.Router {
    return this._router;
  }
}
