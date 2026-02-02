import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import verifyRefreshToken from "../configs/verifyRefreshToken";
import { JWT_SECRET } from "../configs";
import jwt from "jsonwebtoken";
import UserToken from "../models/userToken";
import InternalServerError from "../errors/InternalServerError";

interface IRefreshTokenPayload {
  _id: string;
  roles: string;
}

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
      return next(new BadRequestError("Refresh token не передан"));
    }

    const tokenDetails = (await verifyRefreshToken(
      refreshToken,
    )) as IRefreshTokenPayload;
    const payload = {
      userId: tokenDetails._id,
      roles: tokenDetails.roles,
    };
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "14m",
    });
    // verifyRefreshToken — должна быть функция, которая проверяет и возвращает данные
    res.status(200).send({
      error: false,
      accessToken,
      message: "Access token created successfully",
    });
  } catch (error) {
    return next(new InternalServerError("Ошибка на сервере"));
  }
};

// logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
      // Возвращаем ошибку, если токен не передан
      return next(new BadRequestError("Refresh token не передан"));
    }

    const userToken = await UserToken.findOne({ token: refreshToken });

    if (!userToken) {
      // Если токен в базе не найден — считаем, что пользователь уже "вышел"
      res.status(200).send({ message: "Logged Out Successfully" });
    }

    await userToken?.deleteOne();
    res.send({ message: "Logged Out Sucessfully" });
  } catch (err) {
    return next(new InternalServerError("Ошибка на сервере"));
  }
};
