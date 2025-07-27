import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import verifyRefreshToken from "../configs/verifyRefreshToken";
import { JWT_SECRET } from "../configs";
import jwt from "jsonwebtoken";
import UserToken from "../models/userToken";
import InternalServerError from "../errors/InternalServerError";

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
      return next(new BadRequestError("Refresh token не передан"));
    }

    // verifyRefreshToken — должна быть функция, которая проверяет и возвращает данные
    verifyRefreshToken(refreshToken)
      .then((tokenDetails: any) => {
        const payload = {
          userId: tokenDetails._id,
          roles: tokenDetails.roles,
        };
        const accessToken = jwt.sign(payload, JWT_SECRET, {
          expiresIn: "14m",
        });
        res.status(200).send({
          error: false,
          accessToken,
          message: "Access token created successfully",
        });
      })
      .catch((err) => {
        return next(
          new BadRequestError("Неверный или просроченный refresh token")
        );
      });
  } catch (error) {
    return next(new InternalServerError("Ошибка на сервере"));
  }
};

// logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
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
