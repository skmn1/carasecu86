import express, { type Request, type Response } from "express";
import cors from "cors";
import pino from "pino";
import { pinoHttp } from "pino-http";
import { HealthCheckResponse } from "@v2/api-zod";

const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });

const app = express();
app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/healthz", (_req: Request, res: Response) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default app;
