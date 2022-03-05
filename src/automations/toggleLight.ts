import { callService } from "lib/haConnection";

export default {
  id: "toggleLights",
  state: "idle",
  triggers: [
    {
      entity_id: "light.lounge_uplight",
      validation: ({ new_state }: any) => new_state.state === "on",
    },
  ],
  actions: [
    () =>
      callService({
        type: "call_service",
        domain: "light",
        service: "turn_off",
        target: { entity_id: "light.lounge_ambilight" },
      }),
    () =>
      setTimeout(
        () =>
          callService({
            type: "call_service",
            domain: "light",
            service: "turn_on",
            target: { entity_id: "light.lounge_ambilight" },
          }),
        3000
      ),
  ],
};
