import { service, delay } from "../hass-js";

export default {
  id: "toggleLights",
  state: "idle",
  parameters: [],
  action: async ({ entity_id }: any) => {
    await service({
      domain: "light",
      service: "toggle",
      target: { entity_id },
    });

    await delay(5000);

    await service({
      domain: "light",
      service: "toggle",
      target: { entity_id },
    });
  },
};
