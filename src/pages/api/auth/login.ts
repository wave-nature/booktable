import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "@/utils/db";

interface ReqBody {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({
      message: "Not valid request method, try POST method on same url",
    });

  const { email, password } = req.body as ReqBody;
  const errorMessages: string[] = [];
  const validators = [
    {
      valid: validator.isEmail(email),
      message: "Invalid Email",
    },
    {
      valid: validator.isLength(password, {
        min: 1,
      }),
      message: "Invalid Password",
    },
  ];

  validators.forEach((item) => {
    if (!item.valid) errorMessages.push(item.message);
  });

  if (errorMessages.length) {
    return res.status(400).json({
      message: errorMessages[0],
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found. please signup",
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "either email or password is incorrect",
    });
  }

  const token = jwt.sign({ payload: email }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });

  setCookie("jwt", token, { req, res, maxAge: 24 * 60 * 60 });

  res.status(201).json({
    message: "user loggedin successfully",
    user: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    },
  });
}
