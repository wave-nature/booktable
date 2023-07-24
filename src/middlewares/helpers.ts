import { NextApiResponse } from "next";

export function createResponse(
  res: NextApiResponse,
  statusCode: number,
  payload: any
) {
  res.status(statusCode).json(payload);
}
