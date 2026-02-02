import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import BadRequestError from "../errors/BadRequestError";
import ErrorNotFound from "../errors/ErrorNotFound";
import Forbidden from "../errors/Forbidden";
import Apartment from "../models/apartment";
import InternalServerError from "../errors/InternalServerError";

export const getApartments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    Apartment.find({})
      .then((apartment) => res.send({ apartment }))
      .catch((err) => next(err));
  } catch (err) {
    return next(err);
  }
};

export const getApartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { apartmentId } = req.params;
    const apartment = await Apartment.findById(apartmentId).populate("rooms");
    if (!apartment) {
      return next(new ErrorNotFound({ message: "Апартамент не найден" }));
    }
    res.send({ apartment });
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
    const application = await Apartment.create({
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

export const createApartment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { apartmentId, dataApplication } = req.body;

  const ownerId = req?.user?._id;
  if (!ownerId) {
    return next(new Forbidden({ message: "Необходима авторизация" }));
  }
  // Защита: если apartmentId нет
  if (!apartmentId) {
    return next(new BadRequestError({ message: "Не передан _id квартиры" }));
  }
  try {
    const apartment = await Apartment.findOneAndUpdate(
      { _id: apartmentId, owner: ownerId },
      {
        dataApplication,
        isDraft: false,
      },
      {
        new: true, // вернуть обновлённый документ
        runValidators: true,
      },
    );

    if (!apartment) {
      return next(new BadRequestError({ message: "Квартира не найдена" }));
    }

    res.status(200).send(apartment);
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

export function updateApartments(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const apartmentId = req?.params?.apartmentId;

  Apartment.findByIdAndUpdate(
    apartmentId,
    {
      dataApplication: req.body.dataApplication,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((apartment) => {
      if (!apartment) {
        return next(
          new ErrorNotFound({ message: "Переданы некорректные данные" }),
        );
      }
      return res.send(apartment);
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
    const { apartmentId } = req.params;
    const ownerId = req.user?._id;

    if (!apartmentId) {
      return next(new BadRequestError({ message: "Не передан id квартиры" }));
    }

    const apartment = await Apartment.findOneAndDelete({
      _id: apartmentId,
      owner: ownerId,
      isDraft: true,
    });

    if (!apartment) {
      // ничего не удалилось, но ошибки не кидаем
      res.status(200).send({ success: false, message: "Нечего удалять" });
    }

    res.status(200).send({ success: true });
  } catch (err) {
    console.error("Ошибка удаления квартиры:", err);
    return next(new InternalServerError({ message: "Ошибка сервера" }));
  }
};
