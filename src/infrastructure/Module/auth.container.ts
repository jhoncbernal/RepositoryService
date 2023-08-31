// auth.container.ts
import { AuthController } from "@/controllers/auth.controller";
import { TYPES } from "@/infrastructure/types";
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";
import { Auth, IAuthDocument } from "@/models/auth.model";
import AuthRepository from "@/repositories/auth.repository";
import AuthService from "@/services/auth.service";

export const AuthContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    // Explicit Controller bindings
    bind<AuthController>(TYPES.AuthController)
      .to(AuthController)
      .inSingletonScope();

    // Explicit Service bindings
    bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();

    // Explicit Repository bindings
    bind<AuthRepository>(TYPES.AuthRepository)
      .to(AuthRepository)
      .inSingletonScope();

    // Model bindings
    bind<Model<IAuthDocument>>(TYPES.Auth).toConstantValue(Auth);
  }
);
