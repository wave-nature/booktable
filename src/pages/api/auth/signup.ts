import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "@/utils/db";

interface ReqBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
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

  const { firstName, lastName, email, phone, city, password } =
    req.body as ReqBody;
  const errorMessages: string[] = [];
  const validators = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      message: "Invalid First Name",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      message: "Invalid Last Name",
    },
    {
      valid: validator.isEmail(email),
      message: "Invalid Email",
    },
    {
      valid: validator.isLength(city, {
        min: 1,
      }),
      message: "Invalid City",
    },
    {
      valid: validator.isMobilePhone(phone),
      message: "Invalid Phone",
    },
    {
      valid: validator.isStrongPassword(password),
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

  let user = await prisma.user
    .findFirst({
      where: {
        email,
      },
    })
    .catch((err) => {
      return res.status(400).json({
        message: "some went wrong",
      });
    });

  if (user) {
    return res.status(400).json({
      message: "user already exists with this email id",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      city,
      phone,
      password: hashPassword,
    },
  });
  const token = jwt.sign({ payload: email }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
  setCookie("jwt", token, { req, res, maxAge: 24 * 60 * 60 });

  res.status(201).json({
    message: "user created successfully",
    user: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    },
  });
}
