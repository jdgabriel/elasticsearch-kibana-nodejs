import pino from "pino";

const logger = pino({
  name: "es-learning",
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});

export { logger };
