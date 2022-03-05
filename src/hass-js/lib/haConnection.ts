import {
  createConnection,
  createLongLivedTokenAuth,
  HassEntities,
  subscribeEntities,
  Connection,
} from "home-assistant-js-websocket";

import { createSocket } from "./socket";

export interface IHassConnection {
  hassUrl: string;
  hassToken: string;
}

export let connection: Connection;
export let entities: HassEntities = {};

export const connect = async ({ hassUrl, hassToken }: IHassConnection) => {
  if (!hassUrl) throw new Error("HASS URL not found");
  if (!hassToken) throw new Error("Long Lived Token not found");

  const auth = createLongLivedTokenAuth(hassUrl, hassToken);

  connection = await createConnection({
    auth,
    createSocket: async () => createSocket(auth, true),
  });

  subscribeEntities(connection, async (res) => (entities = res));

  // TODO: Subscribe to events for automation support
  // connection.subscribeEvents(({ data }: any) => runAutomations(data), "state_changed");
};
