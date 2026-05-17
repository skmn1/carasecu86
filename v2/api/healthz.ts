import type { VercelRequest, VercelResponse } from "@vercel/node";
import { HealthCheckResponse } from "@v2/api-zod";

export default function handler(_req: VercelRequest, res: VercelResponse): void {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
}
