import { Router } from "express";
import {
  createApartament,
  getApartament,
  getApartaments,
  updateApartaments,
} from "../controllers/apartaments";
import productRoute from "./products";

// import {
//   createCardValid,
//   parameterIdValid,
// } from "../middlewares/validationJoi";
const router = Router();
router.use("/:apartamentId/products", productRoute);

router.get("/", getApartaments);
router.get("/:apartamentId", getApartament);
router.post("/", createApartament);

router.patch("/:apartamentId", updateApartaments);
// router.patch("/:cardId/:sizeId", updateRoomSize);
// router.delete("/:cardId/:sizeId/:elementId", deleteProductElement);
// router.patch("/:cardId/:sizeId/:elementId", updateProductElement);

export default router;
