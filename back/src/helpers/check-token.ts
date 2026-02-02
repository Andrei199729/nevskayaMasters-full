import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../configs";

export default async (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return false;
  }
};
