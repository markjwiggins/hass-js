import express from "express";
import debug from "debug";

interface IReqBody {
  id: string | number;
  params?: { [key: string]: any } | string;
  noWait?: boolean;
}

const script = async (scripts: any[]) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { id, params, noWait } = req.body as IReqBody;

    if (!id) return res.status(400).json({ message: `Script ID not provided` });

    const script = scripts.find((script) => script.id === id);
    if (!script) return res.status(404).json({ message: `Script ID: ${id} not found` });

    const processedParams = typeof params === "string" ? JSON.parse(params.replace(/'/g, '"')) : params;

    if (noWait) {
      script.action(processedParams).catch((e: any) => debug("route:script")(e.message));
      return res.sendStatus(204);
    }

    try {
      await script.action(processedParams);
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
    res.sendStatus(204);
  });

  return router;
};

export default script;
