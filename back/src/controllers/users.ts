import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Admin from "../models/admin";
import getDataFromFile from "../helpers/files";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../configs";
import checkToken from "../helpers/check-token";
import ErrorNotFound from "../errors/ErrorNotFound";
import BadRequestError from "../errors/BadRequestError";
import Unauthorized from "../errors/Unauthorized";
import ErrorConflict from "../errors/ErrorConflict";
import InternalServerError from "../errors/InternalServerError";
import { AuthenticatedRequest } from "../middlewares/auth";
import generateTokens from "../configs/generateTokens";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    User.find({})
      .then((users) => res.send(users))
      .catch((err) => next(err));
  } catch (err) {
    return next(err);
  }
};

export function getUserMe(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    User.findById(req?.user?._id)
      .then((user) => {
        if (!user?._id) {
          return next(
            new ErrorNotFound({
              message: "Запрашиваемый пользователь не найден",
            })
          );
        }
        return res.send({ data: user });
      })
      .catch((err) => {
        if (err.name === "CastError") {
          return next(
            new BadRequestError({ message: "Переданы некорректные данные" })
          );
        }
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
}

export const getUserId = (req: Request, res: Response, next: NextFunction) => {
  try {
    // логика
    const { id } = req.params;

    User.findOne({ id: parseInt(id) })
      .then((user) => {
        if (!user) {
          return next(
            new ErrorNotFound({
              message: "Запрашиваемый пользователь не найден",
            })
          );
        }
        return res.send(user);
      })
      .then()
      .catch((err) => {
        if (err.name === "CastError") {
          return next(
            new BadRequestError({ message: "Переданы некорректные данные" })
          );
        }
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, roles } = req.body;

    if (!email || !password) {
      return next(new Unauthorized("Указан некорректный Email или пароль."));
    }
    if (roles === "supervisor") {
      const existingSupervisor = await User.findOne({ roles: "supervisor" });
      if (existingSupervisor) {
        return next(new ErrorConflict("Руководитель уже зарегистрирован"));
      }
    }
    User.findOne({ email }).then(async (admin) => {
      if (admin) {
        return next(
          new ErrorConflict(
            `Пользователь с таким email ${email} уже зарегистрирован`
          )
        );
      }
      try {
        const hash = await bcrypt.hash(password, 10);
        User.create({ roles, email, password: hash })
          .then(({ _id, email, roles }) =>
            res.status(201).send({ _id, email, roles })
          )
          .catch((err) => {
            if (err.name === "ValidationError") {
              return next(new BadRequestError("Переданы некорректные данные."));
            } else if (err.code === 11000) {
              return next(new ErrorConflict(err.errorMessage));
            } else {
              return next(err);
            }
          });
      } catch (err) {
        return next(new InternalServerError("Ошибка сервера"));
      }
    });
  } catch (err) {
    return next(new InternalServerError("Ошибка сервера"));
  }
};

export const addUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = { ...req.body };

    User.countDocuments({})
      .then((id) => User.create({ ...data, id }))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === "CastError") {
          return next(
            new BadRequestError({ message: "Переданы некорректные данные" })
          );
        }
        return next(err);
      });
  } catch (err) {
    return next(
      new BadRequestError({ message: "Переданы некорректные данные" })
    );
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Unauthorized("Указан некорректный Email или пароль.");
    }

    User.findOne({ email }).then((admin) => {
      if (!admin) {
        return next(
          new Unauthorized(`Пользователь с таким email ${email} не существует`)
        );
      }
      const payload = { _id: admin._id };
      bcrypt
        .compare(password, admin?.password)
        .then(async (matched) => {
          if (!matched) {
            throw new Unauthorized("Указан некорректный Email или пароль.");
          }
          const { accessToken, refreshToken } = await generateTokens(admin);

          return res.send({
            message: "Авторизация успешна",
            accessToken,
            refreshToken,
          });
        })
        .catch((err) => {
          return next(
            new Unauthorized("Указан некорректный Email или пароль.")
          );
        });
    });
  } catch (err) {
    return next(new InternalServerError("Ошибка на сервере"));
  }
};
