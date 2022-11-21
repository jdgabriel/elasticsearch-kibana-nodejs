import express, { Request, Response } from "express";
import { logger } from "./clients/logger";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ hello: "world" });
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server running at http://locahost:${PORT}`);
});
