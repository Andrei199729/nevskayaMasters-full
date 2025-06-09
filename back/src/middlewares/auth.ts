import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Расширенный тип запроса
interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { _id: string };
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    res.status(401).send({ message: "Необходима авторизация" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, "some-secret-key") as JwtPayload & {
      _id: string;
    };
    (req as AuthenticatedRequest).user = payload;
    next();
  } catch (err) {
    res.status(401).send({ message: "Необходима авторизация" });
  }
};

export default auth;
