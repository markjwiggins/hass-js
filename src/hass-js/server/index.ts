import express from "express";
import debugLib from "debug";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";

import { syntaxErrorHandler } from "../middleware";
import { connect } from "../lib/haConnection";
import { script } from "../routes";

export interface IServerOptions {
  port: number;
  hassUrl: string;
  hassToken: string;
  isDev?: boolean;
  scripts?: any;
}

export const server = async ({ port, hassUrl, hassToken, isDev, scripts = [] }: IServerOptions) => {
  if (!port) process.exit(1);

  const debug = debugLib("http");
  const loggerLevel = isDev ? "dev" : "common";

  const app = express();

  app.use(helmet());
  app.use(logger(loggerLevel));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(syntaxErrorHandler);

  // connect to hass via websocket
  connect({ hassUrl, hassToken });

  app.use("/script", await script(scripts));

  app.listen(port, () => debug(`hass-js running on port ${port}`));

  return app;
};
