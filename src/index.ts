import "dotenv/config";
import path from "path";

import { server, directoryImport } from "hass-js";

const port: number = parseInt(process.env.PORT as string, 10);
const isDev = process.env.NODE_ENV === "development";
const hassUrl = process.env.HASS_URL;
const hassToken = process.env.HASS_LLT;

if (!port || !hassUrl || !hassToken) process.exit(1);

(async () => {
  const scripts = await directoryImport(path.join(__dirname, "scripts"));
  const app = await server({ port, isDev, hassUrl, hassToken, scripts });
})();

// import "dotenv/config";
// import express from "express";
// import debugLib from "debug";
// import cors from "cors";w
// import logger from "morgan";
// import helmet from "helmet";

// import { connect, entities, callService } from "lib/haConnection";

// import { getAllModules } from "utilities/getAllModules";

// if (!process.env.PORT) process.exit(1);

// const debug = debugLib("http");

// const PORT: number = parseInt(process.env.PORT as string, 10);
// const isDev = process.env.NODE_ENV === "development";
// const loggerLevel = isDev ? "dev" : "common";

// const app = express();

// app.use(helmet());
// app.use(logger(loggerLevel));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connect();

// app.get("/", async (req, res, next) => {
//   res.json(entities);
// });

// app.post("/script", async (req, res) => {
//   const scripts = await getAllModules("scripts");

//   const { id, params } = req.body;

//   const processedParams = params ? JSON.parse(params.replace(/'/g, '"')) : {};

//   if (!id) return res.status(400).json({ message: `Script ID not provided` });

//   const script = scripts.find((script) => script.id === "toggleLights");

//   if (!script) return res.status(404).json({ message: `Script ID: ${id} not found` });

//   script.action(processedParams);

//   res.sendStatus(204);
// });

// app.listen(PORT, () => debug(`Listening on port ${PORT}`));
