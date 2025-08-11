import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import path from "path";
import getDataFromFile from "../helpers/files";
import { AuthenticatedRequest } from "../middlewares/auth";
import BadRequestError from "../errors/BadRequestError";
import ErrorNotFound from "../errors/ErrorNotFound";
import Forbidden from "../errors/Forbidden";

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

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Product.findById(req?.params?.cardId)
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

  try {
    const product = await Product.create({
      nameRoom,
      dataProduct,
      owner: ownerId,
    });
    console.log(product);

    if (!product) {
      return next(
        new BadRequestError({ message: "Переданы некорректные данные" })
      );
    }

    res.status(201).send(product);
  } catch (err) {
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
  const cardId = req?.params?.cardId;

  Product.findByIdAndUpdate(cardId, req.body.dataProduct, {
    new: true,
    runValidators: true,
  })
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

// export function updateProductElement(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const { cardId, sizeId, elementId } = req.params;
//   const { data, dataObj } = req.body;
//   console.log(data, "data");
//   const idElement = req.body.dataObj;

//   console.log(req, "idElement");
//   console.log(cardId, "cardId");
//   console.log(sizeId, "sizeId");
//   console.log(elementId, "elementId");

//   Product.findByIdAndUpdate(
//     cardId,
//     {
//       $set: {
//         "dataProduct.$[dp].drawingData.walls.$[wall].size.arrElements.elements.$[elem].data":
//           data,
//         "dataProduct.$[dp].drawingData.walls.$[wall].size.arrElements.elements.$[elem].dataObj":
//           dataObj,
//       },
//     },
//     {
//       arrayFilters: [
//         { dp: {} },
//         { "wall.size.id": Number(sizeId) }, // фильтр стены (по size.id)
//         { "elem.dataObj.id": Number(elementId) }, // фильтр элемента внутри стены
//       ],
//       new: true,
//     }
//   )
//     .then((product) => {
//       if (!product) {
//         return next(
//           new BadRequestError({ message: "Переданы некорректные данные" })
//         );
//       }
//       console.log(product, "product");

//       return res.send(product);
//     })
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         return next(
//           new BadRequestError({ message: "Переданы некорректные данные" })
//         );
//       }
//       return next(err);
//     });
// }

// export function updateProductElement(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const { cardId, sizeId, elementId } = req.params;
//   const { data } = req.body;

//   Product.findById(cardId)
//     .then((product: any) => {
//       if (!product) {
//         return next(new BadRequestError("Переданы некорректные данные"));
//       }

//       if (product.owner.toString() !== req.user?._id) {
//         return next(
//           new Forbidden("Вы не можете изменить данные этого элемента")
//         );
//       }

//       const dp = product.dataProduct[0];
//       if (!dp) {
//         return next(new ErrorNotFound("Комната не найдена"));
//       }

//       const wall = dp.drawingData.walls.find(
//         (wall: { size: { id: number } }) => wall.size.id === Number(sizeId)
//       );
//       if (!wall) {
//         return next(new ErrorNotFound("Стена не найдена"));
//       }

//       const elements = wall.size.arrElements?.elements;
//       if (!elements) {
//         return next(new ErrorNotFound("Элементы стены не найдены"));
//       }

//       const idx = Number(elementId);
//       if (isNaN(idx) || idx < 0 || idx >= elements.length) {
//         return next(new ErrorNotFound("Элемент стены не найден"));
//       }

//       // Обновляем data в элементе
//       elements[idx].data = {
//         ...elements[idx].data,
//         ...data,
//       };

//       return product.save();
//     })
//     .then((updatedProduct) => {
//       res
//         .status(200)
//         .send({ data: updatedProduct, message: "Элемент изменен" });
//     })
//     .catch((err) => {
//       next(err);
//     });
// }

// export function deleteProductElement(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const { cardId, sizeId, elementId } = req.params;
//   console.log(cardId, "cardId");
//   console.log(sizeId, "sizeId");
//   console.log(elementId, "elementId");

//   Product.findOneAndUpdate(
//     { _id: cardId },
//     {
//       $pull: {
//         "dataProduct.$[dp].drawingData.walls.$[wall].size.arrElements.elements":
//           elementId,
//       },
//     },
//     {
//       arrayFilters: [
//         { dp: { $exists: true } }, // для dp можно оставить пустой фильтр (если один dataProduct)
//         { "wall.size.id": sizeId }, // фильтр стены по id
//       ],
//       new: true,
//     }
//   )
//     .then((element) => {
//       if (!element) {
//         return next(new ErrorNotFound("Карточка не найдена"));
//       }

//       // if (card.owner.toString() !== req.user?._id) {
//       //   return next(
//       //     new Forbidden("Вы не можете удалить элемент этой карточки")
//       //   );
//       // }
//       return res.send({ data: element, message: "Карточка удалена" });
//     })

//     .catch((err: Error) => {
//       if (err.name === "CastError") {
//         return next(new BadRequestError("Переданы некорректные данные"));
//       }
//       return next(err);
//     });
// }

export function deleteProductElement(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { cardId, sizeId, elementId } = req.params;

  Product.findById(cardId)
    .then((product: any) => {
      if (!product) {
        next(new ErrorNotFound("Карточка не найдена"));
      }

      if (product?.owner.toString() !== req.user?._id) {
        next(new Forbidden("Вы не можете удалять элементы из этой карточки"));
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
