import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import path from "path";
import getDataFromFile from "../helpers/files";
import { AuthenticatedRequest } from "../middlewares/auth";

const dataPath = path.join(__dirname, "..", "data", "product.json");
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Product.find({})
      .then((product) => res.send({ product }))
      .catch((err) => next(err));
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
  console.log(req.body, "req.body");
  console.log(ownerId, "ownerId");
  console.log(dataProduct, "dataProduct");

  try {
    const product = await Product.create({
      nameRoom,
      dataProduct,
      owner: ownerId,
    });
    console.log(product);

    if (!product) {
      // return next(
      //   new BadRequestError({ message: "Переданы некорректные данные" })
      // );
      res.status(404).send({ messege: "продукт не найден" });
    }

    res.status(201).send(product);
  } catch (err) {
    // if (err.name === "ValidationError") {
    // return next(
    //   new BadRequestError({ message: "Переданы некорректные данные" })
    // );
    // res.status(404).send({ messege: "продукт не найден" });
    // }
    res.status(404).send({ messege: "продукт не найден" });
  }
};
