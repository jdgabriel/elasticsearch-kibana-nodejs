import express, { Request, Response } from "express";
import { client } from "./clients/elasticsearch";
import { logger } from "./clients/logger";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ hello: "world" });
});

app.post("/", async (req: Request, res: Response) => {
  const { path, description } = req.body;

  //CREATE YOUR DATA WHATEVER DATABASE HERE

  const createPaths = path.split("/").map((ph) => ({
    [ph]: ph,
  }));

  const esCreated = await client.index({
    index: "folders",
    document: {
      paths: createPaths,
    },
  });

  return res.status(200).json(esCreated);
});

app.post("/search", async (req: Request, res: Response) => {
  const { search } = req.body;

  const esFind = await client.search<{ paths: { path: string }[] }>({
    index: "folders",
    query: {
      match: {
        [`paths.${search}`]: search,
      },
    },
  });
  return res.status(200).json(esFind);
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
