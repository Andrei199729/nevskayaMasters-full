import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Unauthorized from "../errors/Unauthorized";
import { JWT_SECRET } from "../configs";

// Расширенный тип запроса
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { _id: string };
}

export default (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new Unauthorized("Необходима авторизация"));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized("Необходима авторизация"));
  }

  req.user = { _id: (payload as JwtPayload)._id };

  return next();
};
