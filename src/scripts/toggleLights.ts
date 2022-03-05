import { service } from "../hass-js";

export default {
  id: "toggleLights",
  state: "idle",
  parameters: [],
  action: async ({ entity_id }: any) => {
    const entity_ids = !Array.isArray(entity_id) ? [entity_id] : entity_id;

    entity_ids.forEach((entity_id) =>
      service({
        domain: "light",
        service: "toggle",
        target: { entity_id },
      })
    );
  },
};
