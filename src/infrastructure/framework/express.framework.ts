import { PROJECT, SERVER } from "@/infrastructure/config";
import express, { Router } from "express";
import * as core from "express-serve-static-core";
export const app: core.Express = express();

export const startExpress = (router: Router): Promise<void> => {
  
  app.use(router);
  const port = PROJECT.mode === "development" ? SERVER.port : 80;
  return new Promise<void>((resolve) => {
    app.listen(port, () => {
      console.info(
        PROJECT.name + " API running on " + `${SERVER.hostname}:${port}`
      );
      resolve();
    });
  });
};
