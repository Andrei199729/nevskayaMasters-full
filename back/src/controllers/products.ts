import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import { AuthenticatedRequest } from "../middlewares/auth";
import BadRequestError from "../errors/BadRequestError";
import ErrorNotFound from "../errors/ErrorNotFound";
import Forbidden from "../errors/Forbidden";
import Apartment from "../models/apartment";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { apartmentId } = req.params;
  try {
    const products = await Product.find({ apartment: apartmentId });
    res.send({ products });
  } catch (err) {
    return next(err);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId, apartmentId } = req.params;
  try {
    const product = await Product.findOne({
      cardId,
      apartment: apartmentId,
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
  next: NextFunction,
) => {
  const { nameRoom, dataProduct } = req.body;
  const ownerId = req?.user?._id;
  const { apartmentId } = req.params;
  if (!ownerId || !apartmentId) {
    return next({ message: "Нужны owner и apartmentId", statusCode: 400 });
  }
  try {
    const product = await Product.create({
      nameRoom,
      dataProduct,
      owner: ownerId,
      apartment: apartmentId,
    });

    // 2️⃣ Добавляем комнату в массив rooms апартамента
    const apartment = await Apartment.findByIdAndUpdate(
      apartmentId,
      { $push: { rooms: product._id } },
      { new: true },
    );

    if (!apartment) {
      return next(
        new BadRequestError({ message: "Переданы некорректные данные" }),
      );
    }

    res.status(201).send(product);
  } catch (err) {
    console.error("Ошибка создания комнаты:", err);
    return next(
      new BadRequestError({ message: "Переданы некорректные данные" }),
    );
  }
};

export function updateProduct(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const { cardId, apartmentId } = req.params;

  Product.findOneAndUpdate(
    { _id: cardId, apartment: apartmentId, owner: req.user?._id },
    { dataProduct: req.body.dataProduct },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((product) => {
      if (!product) {
        return next(
          new ErrorNotFound({ message: "Переданы некорректные данные" }),
        );
      }

      return res.send(product);
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

export function updateRoomSize(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const { cardId, sizeId, apartmentId } = req.params; // id комнаты и id размера стены
  const updateData = req.body; // сюда приходят новые height/width и т.п.

  Product.findOneAndUpdate(
    { _id: cardId, apartment: apartmentId, owner: req.user?._id },
    { $set: { "dataProduct.drawingData.walls.$[wall].size": updateData } },
    {
      new: true,
      runValidators: true,
      arrayFilters: [{ "wall.id": sizeId }], // или wall._id если в БД _id
    },
  )
    .then((product) => {
      if (!product) {
        return next(
          new ErrorNotFound({ message: "Комната или стена не найдены" }),
        );
      }

      return res.send(product);
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

export async function deleteProductElement(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { cardId, sizeId, elementId, apartmentId } = req.params;
    const product = await Product.findOne({
      _id: cardId,
      apartment: apartmentId,
    });

    if (!product) {
      return next(new ErrorNotFound("Карточка не найдена"));
    }

    if (product?.owner.toString() !== req.user?._id.toString()) {
      return next(
        new Forbidden("Вы не можете удалять элементы из этой карточки"),
      );
    }
    const dp = product.dataProduct?.[0];
    if (!dp) {
      return next(new ErrorNotFound("Комната не найдена"));
    }

    const wall = dp.drawingData.walls.find(
      (wall: { size: { id: number } }) => wall.size.id === Number(sizeId),
    );

    if (!wall) {
      return next(new ErrorNotFound("Стена не найдена"));
    }

    const elements = wall?.size?.arrElements?.elements;
    if (!elements) {
      return next(new ErrorNotFound("Элементы стены не найдены"));
    }

    const idx = Number(elementId);
    if (isNaN(idx) || idx < 0 || idx >= elements.length) {
      return next(new ErrorNotFound("Элемент стены не найден"));
    }

    elements?.splice(idx, 1); // удаляем элемент по индексу
    const updatedProduct = await product.save();
    res.status(200).send({
      data: updatedProduct,
      message: "Элемент удалён",
    });
  } catch (err) {
    next(err);
  }
}
