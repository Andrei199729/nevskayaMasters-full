import { Request, Response, NextFunction } from "express";
import path from "path";
import getDataFromFile from "../helpers/files";
import { AuthenticatedRequest } from "../middlewares/auth";
import BadRequestError from "../errors/BadRequestError";
import ErrorNotFound from "../errors/ErrorNotFound";
import Forbidden from "../errors/Forbidden";
import Apartament from "../models/apartament";
import product from "../models/product";

export const getApartaments = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  try {
    const { apartamentId } = req.params;
    const apartament = await Apartament.findById(apartamentId).populate(
      "rooms"
    );
    if (!apartament) {
      return next(new ErrorNotFound({ message: "Апартамент не найден" }));
    }
    res.send({ apartament });
  } catch (err) {
    return next(err);
  }
};

export const createApartament = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { dataApplication } = req.body;
  const ownerId = req?.user?._id;
  console.log(dataApplication, "dataApplication=express");

  try {
    const apartament = await Apartament.create({
      dataApplication,
      owner: ownerId,
      rooms: [],
    });

    if (!apartament) {
      return next(
        new BadRequestError({ message: "Переданы некорректные данные" })
      );
    }

    res.status(201).send(apartament);
  } catch (err) {
    console.error("Ошибка создания Apartament:", err); // реальная ошибка
    return next({ message: err, statusCode: 400 });
  }
};

export function updateApartaments(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
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
    }
  )
    .then((apartament) => {
      if (!apartament) {
        return next(
          new ErrorNotFound({ message: "Переданы некорректные данные" })
        );
      }
      return res.send(apartament);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new ErrorNotFound({ message: "Переданы некорректные данные" })
        );
      }
      return next(err);
    });
}
