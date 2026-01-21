import { Request, Response, NextFunction } from "express";
import path from "path";
import getDataFromFile from "../helpers/files";
import { AuthenticatedRequest } from "../middlewares/auth";
import BadRequestError from "../errors/BadRequestError";
import ErrorNotFound from "../errors/ErrorNotFound";
import Forbidden from "../errors/Forbidden";
import Apartament from "../models/apartament";
import product from "../models/product";
import mongoose from "mongoose";
import InternalServerError from "../errors/InternalServerError";

export const getApartaments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    Apartament.find({})
      .then((apartament) => res.send({ apartament }))
      .catch((err) => next(err));
  } catch (err) {
    return next(err);
  }
};

export const getApartament = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { apartamentId } = req.params;
    const apartament =
      await Apartament.findById(apartamentId).populate("rooms");
    if (!apartament) {
      return next(new ErrorNotFound({ message: "Апартамент не найден" }));
    }
    res.send({ apartament });
  } catch (err) {
    return next(err);
  }
};

export const createApplication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  // const { dataApplication } = req.body;
  const ownerId = req?.user?._id;
  if (!ownerId) {
    return next(new Forbidden({ message: "Необходима авторизация" }));
  }
  try {
    const application = await Apartament.create({
      dataApplication: {},
      owner: ownerId,
      rooms: [],
      isDraft: true,
    });

    if (!application) {
      return next(
        new BadRequestError({ message: "Переданы некорректные данные" }),
      );
    }

    res.status(201).send(application);
  } catch (err) {
    console.error("Ошибка создания заявки:", err); // реальная ошибка
    return next(
      new BadRequestError({
        message: err instanceof Error ? err.message : "Ошибка создания заявки",
      }),
    );
  }
};

export const createApartament = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { apartamentId, dataApplication } = req.body;

  const ownerId = req?.user?._id;
  if (!ownerId) {
    return next(new Forbidden({ message: "Необходима авторизация" }));
  }
  // Защита: если apartamentId нет
  if (!apartamentId) {
    return next(new BadRequestError({ message: "Не передан _id квартиры" }));
  }
  try {
    const apartament = await Apartament.findOneAndUpdate(
      { _id: apartamentId, owner: ownerId },
      {
        dataApplication,
        isDraft: false,
      },
      {
        new: true, // вернуть обновлённый документ
        runValidators: true,
      },
    );

    if (!apartament) {
      return next(new BadRequestError({ message: "Квартира не найдена" }));
    }

    res.status(200).send(apartament);
  } catch (err) {
    console.error("Ошибка обновления квартиры:", err); // реальная ошибка
    return next(
      new BadRequestError({
        message:
          err instanceof Error ? err.message : "Ошибка обновления квартиры",
      }),
    );
  }
};

export function updateApartaments(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const apartamentId = req?.params?.apartamentId;

  Apartament.findByIdAndUpdate(
    apartamentId,
    {
      dataApplication: req.body.dataApplication,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((apartament) => {
      if (!apartament) {
        return next(
          new ErrorNotFound({ message: "Переданы некорректные данные" }),
        );
      }
      return res.send(apartament);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new ErrorNotFound({ message: "Переданы некорректные данные" }),
        );
      }
      return next(err);
    });
}

export const deleteApplication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { apartamentId } = req.params;
    const ownerId = req.user?._id;

    if (!apartamentId) {
      return next(new BadRequestError({ message: "Не передан id квартиры" }));
    }

    const apartament = await Apartament.findOneAndDelete({
      _id: apartamentId,
      owner: ownerId,
      isDraft: true,
    });

    if (!apartament) {
      // ничего не удалилось, но ошибки не кидаем
      res.status(200).send({ success: false, message: "Нечего удалять" });
    }

    res.status(200).send({ success: true });
  } catch (err) {
    console.error("Ошибка удаления квартиры:", err);
    return next(new InternalServerError({ message: "Ошибка сервера" }));
  }
};
