import { AppContainer } from "@/infrastructure/startup/containers";
import { StartModule } from "@/index";
import { startExpress } from "@/infrastructure/framework/express.framework";
import { mongooseConnection } from "@/infrastructure/database/mongoose.database";
import { AppDependencies } from "@/infrastructure/d-injection/config";
import { UserContainerModule } from "@/infrastructure/Module/user.container";
import { TYPES } from "@/infrastructure/types";
import { AppRouter } from "@/routes";
import { AuthContainerModule } from "../Module/auth.container";
import { ShareContainerModule } from "../Module/share.container";
import { ImageContainerModule } from "../Module/image.container";

export class SharedBootstrap implements StartModule {
  async init(): Promise<void> {
    try {
      AppContainer.load(
        ShareContainerModule,
        UserContainerModule,
        AuthContainerModule,
        ImageContainerModule
      );

      // database connection
      await mongooseConnection();

      // express server
      const appRouterInstance = AppContainer.get<AppRouter>(TYPES.Router);
      const router = appRouterInstance.router;
      await startExpress(router);

      // independency injection
      new AppDependencies().register(AppContainer);
    } catch (error: any) {
      console.error(
        `[${SharedBootstrap.name}] error starting module --> ${error}`
      );
    }
  }
}
