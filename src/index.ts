import "reflect-metadata";
import { buildProviderModule } from "inversify-binding-decorators";
import { SharedBootstrap } from "@/infrastructure/bootstrap";
import { AppContainer } from "@/infrastructure/startup/containers";

export interface StartModule {
  init(): Promise<void>;
}

const modules = [SharedBootstrap];
for (const module of modules) {
  new module().init();
}

AppContainer.load(buildProviderModule());
