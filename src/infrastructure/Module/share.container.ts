import { ContainerModule, interfaces } from "inversify";
import EventBus from "@/helpers/event-bus.helper";
import Logger from "@/helpers/logger";
import { ILogger, IEventBus } from "../interfaces";
import { AppRouter } from "@/routes";
import { TYPES } from "../types";
import * as config from "../config";

export const ShareContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<ILogger>(TYPES.Logger).to(Logger).inSingletonScope();
    bind<IEventBus>(TYPES.EventBus).to(EventBus).inSingletonScope();
    bind<AppRouter>(TYPES.Router).to(AppRouter).inSingletonScope();
    bind<typeof config>(TYPES.Config).toConstantValue(config);
  }
);
