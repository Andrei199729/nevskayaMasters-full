import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Unauthorized from "../errors/Unauthorized";
import { JWT_SECRET } from "../configs";

// Расширенный тип запроса
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { _id: string };
}

// const auth = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;
//   console.log(authHeader);

//   if (
//     !authHeader ||
//     typeof authHeader !== "string" ||
//     !authHeader.startsWith("Bearer ")
//   ) {
//     res.status(401).send({ message: "Необходима авторизация" });
//     return;
//   }

//   const token = authHeader.replace("Bearer ", "");

//   try {
//     const payload = jwt.verify(token, "some-secret-key") as JwtPayload & {
//       _id: string;
//     };
//     (req as AuthenticatedRequest).user = payload;
//     next();
//   } catch (err) {
//     res.status(401).send({ message: "Необходима авторизация" });
//   }
// };

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

// export default auth;
