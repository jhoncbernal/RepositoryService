import { UserController } from "@/controllers/user.controller";
import { Controller, Repository, Service } from "@/infrastructure/interfaces";
import Router from "@/routes";
import { TYPES } from "@/infrastructure/types";
import { Router as IRouter } from "express";
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";
import { User } from "@/models/user.model";
import UserRepository from "@/repositories/user.repository";
import UserService from "@/services/user.service";

export const UserContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {

    bind<IRouter>(TYPES.Router).toDynamicValue(
      (context: interfaces.Context): IRouter => {
        return Router(
          context.container.get<UserController>(TYPES.UserController)
        );
      }
    );
    bind<Controller>(TYPES.UserController)
      .to(UserController)
      .inSingletonScope();
    bind<Service>(TYPES.Service).to(UserService).inSingletonScope();
    bind<Repository>(TYPES.Repository).to(UserRepository).inSingletonScope();
    bind<Model<any>>(TYPES.User).toConstantValue(User);
  }
);
