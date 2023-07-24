import type { NextApiRequest, NextApiResponse } from "next";
import protect from "@/middlewares/protect";
import { createResponse } from "@/middlewares/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({
      message: "Not valid request method, try POST method on same url",
    });

  const user = await protect(req, res);
  if (user) createResponse(res, 201, { user });
}
