// image.container.ts
import { ImageController } from "@/controllers/image.controller";
import { TYPES } from "@/infrastructure/types";
import { ContainerModule, interfaces } from "inversify";
import ImageService from "@/services/image.service";

export const ImageContainerModule = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    // Explicit Controller bindings
    bind<ImageController>(TYPES.ImageController)
      .to(ImageController)
      .inSingletonScope();

    // Explicit Service bindings
    bind<ImageService>(TYPES.ImageService).to(ImageService).inSingletonScope();
  }
);
