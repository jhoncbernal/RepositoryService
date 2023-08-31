import { UserController } from "@/controllers/user.controller";
import { TYPES } from "@/infrastructure/types";
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";
import { User } from "@/models/user.model";
import UserRepository from "@/repositories/user.repository";
import UserService from "@/services/user.service";

export const UserContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    // Explicit Controller bindings
    bind<UserController>(TYPES.UserController)
      .to(UserController)
      .inSingletonScope();

    // Explicit Service bindings
    bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();

    // Explicit Repository bindings
    bind<UserRepository>(TYPES.UserRepository)
      .to(UserRepository)
      .inSingletonScope();

    // Model bindings
    bind<Model<typeof User>>(TYPES.User).toConstantValue(User);
  }
);
