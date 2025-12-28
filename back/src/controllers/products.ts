import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import path from "path";
import getDataFromFile from "../helpers/files";
import { AuthenticatedRequest } from "../middlewares/auth";
import BadRequestError from "../errors/BadRequestError";
import ErrorNotFound from "../errors/ErrorNotFound";
import Forbidden from "../errors/Forbidden";
import Apartament from "../models/apartament";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { apartamentId } = req.params;
  try {
    const products = await Product.find({ apartament: apartamentId });
    res.send({ products });
  } catch (err) {
    return next(err);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cardId, apartamentId } = req.params;
  try {
    const product = await Product.findOne({
      cardId,
      apartament: apartamentId,
    });

    if (!product) {
      return next(new ErrorNotFound({ message: "Комната не найдена" }));
    }

    res.send({ product });
  } catch (err) {
    return next(err);
  }
};

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { nameRoom, dataProduct } = req.body;
  const ownerId = req?.user?._id;
  const { apartamentId } = req.params;
  if (!ownerId || !apartamentId) {
    return next({ message: "Нужны owner и apartamentId", statusCode: 400 });
  }
  try {
    const product = await Product.create({
      nameRoom,
      dataProduct,
      owner: ownerId,
      apartament: apartamentId,
    });

    // 2️⃣ Добавляем комнату в массив rooms апартамента
    const apartament = await Apartament.findByIdAndUpdate(
      apartamentId,
      { $push: { rooms: product._id } },
      { new: true }
    );

    if (!apartament) {
      return next(
        new BadRequestError({ message: "Переданы некорректные данные" })
      );
    }

    res.status(201).send(product);
  } catch (err) {
    console.error("Ошибка создания комнаты:", err);
    return next(
      new BadRequestError({ message: "Переданы некорректные данные" })
    );
  }
};

export function updateProduct(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { cardId, apartamentId } = req.params;

  Product.findOneAndUpdate(
    { cardId, apartament: apartamentId },
    { dataProduct: req.body.dataProduct },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((product) => {
      if (!product) {
        return next(
          new ErrorNotFound({ message: "Переданы некорректные данные" })
        );
      }
      return res.send(product);
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

export function updateRoomSize(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { cardId, sizeId, apartamentId } = req.params; // id комнаты и id размера стены
  const updateData = req.body; // сюда приходят новые height/width и т.п.

  Product.findOneAndUpdate(
    { _id: cardId, apartament: apartamentId },
    { $set: { "dataProduct.drawingData.walls.$[wall].size": updateData } },
    {
      new: true,
      runValidators: true,
      arrayFilters: [{ "wall.id": sizeId }], // или wall._id если в БД _id
    }
  )
    .then((product) => {
      if (!product) {
        return next(
          new ErrorNotFound({ message: "Комната или стена не найдены" })
        );
      }

      return res.send(product);
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

export function deleteProductElement(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { cardId, sizeId, elementId, apartamentId } = req.params;

  Product.findById({ _id: cardId, apartament: apartamentId })
    .then((product: any) => {
      if (!product) {
        next(new ErrorNotFound("Карточка не найдена"));
      }

      if (product.owner.toString() !== req.user?._id.toString()) {
        return next(
          new Forbidden("Вы не можете удалять элементы из этой карточки")
        );
      }

      const dp = product?.dataProduct[0];
      if (!dp) {
        return next(new ErrorNotFound("Комната не найдена"));
      }

      const wall = dp.drawingData.walls.find(
        (wall: { size: { id: number } }) => wall.size.id === Number(sizeId)
      );

      if (!wall) {
        next(new ErrorNotFound("Стена не найдена"));
      }

      const elements = wall?.size?.arrElements?.elements;
      if (!elements) {
        next(new ErrorNotFound("Элементы стены не найдены"));
      }

      const idx = Number(elementId);
      if (isNaN(idx) || idx < 0 || idx >= elements.length) {
        next(new ErrorNotFound("Элемент стены не найден"));
      }

      elements?.splice(idx, 1); // удаляем элемент по индексу

      return product.save();
    })
    .then((updatedProduct) => {
      res.status(200).send({ data: updatedProduct, message: "Элемент удалён" });
    })
    .catch((err) => {
      next(err);
    });
}
