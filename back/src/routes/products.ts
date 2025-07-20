import { Router } from "express";
import {
  createProduct,
  deleteProductElement,
  getProduct,
  getProducts,
  updateProduct,
  //   updateProductElement,
} from "../controllers/products";

// import {
//   getCards,
//   createCard,
//   deleteCardId,
//   likeCard,
//   dislikeCard,
// } from "../controllers/cards";
// import {
//   createCardValid,
//   parameterIdValid,
// } from "../middlewares/validationJoi";
const router = Router();

router.get("/", getProducts);
router.get("/:cardId", getProduct);
router.post("/", createProduct);

router.patch("/:cardId", updateProduct);
router.delete("/:cardId/:sizeId/:elementId", deleteProductElement);
// router.patch("/:cardId/:sizeId/:elementId", updateProductElement);
// router.delete("/:cardId", parameterIdValid("cardId"), deleteCardId);
// router.put("/:cardId/likes", parameterIdValid("cardId"), likeCard);
// router.delete("/:cardId/likes", parameterIdValid("cardId"), dislikeCard);

export default router;
