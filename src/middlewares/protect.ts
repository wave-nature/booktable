import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import prisma from "@/utils/db";
import { createResponse } from "./helpers";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return createResponse(res, 401, {
        message: "unauthorized request, please provide token",
      });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET as string) as {
      payload: string;
    };
    const email = data.payload;
    if (!email) {
      return res.status(400).json({
        message: "invalid token, please login again",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        first_name: true,
        last_name: true,
        city: true,
        email: true,
        phone: true,
      },
    });
    return user;
  } catch (error) {
    createResponse(res, 400, {
      message: "Something went wrong",
    });
    return false;
  }
}
