const runAutomations = async (event: any) => {
  // TODO: Create automation framework
  // const automations = await directoryImport("automations");
  // automations.forEach((automation) => {
  //   if (automation.state === "running") {
  //     console.log("Already Running...");
  //     return;
  //   }
  //   automation.state = "running";
  //   const triggered = automation.triggers.some(({ entity_id, validation }: any) => {
  //     if (event.entity_id !== entity_id) return false;
  //     return validation(event);
  //   });
  //   console.log({ triggered, entity_id: event.entity_id });
  //   if (triggered) automation.actions.forEach((action: any) => action());
  //   automation.state = "idle";
  // });
};
