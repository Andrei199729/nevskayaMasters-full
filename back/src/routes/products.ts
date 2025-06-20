import { Router } from "express";
import { createProduct, getProducts } from "../controllers/products";

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
router.post("/", createProduct);

// router.post("/", createCardValid, createCard);
// router.delete("/:cardId", parameterIdValid("cardId"), deleteCardId);
// router.put("/:cardId/likes", parameterIdValid("cardId"), likeCard);
// router.delete("/:cardId/likes", parameterIdValid("cardId"), dislikeCard);

export default router;
