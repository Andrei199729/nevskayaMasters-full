import { Router } from "express";
import {
  createApartament,
  createApplication,
  deleteApplication,
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
router.post("/", createApplication);
router.patch("/:apartamentId", createApartament);

router.patch("/:apartamentId", updateApartaments);
router.delete("/:apartamentId", deleteApplication);
// router.patch("/:cardId/:sizeId", updateRoomSize);
// router.delete("/:cardId/:sizeId/:elementId", deleteProductElement);
// router.patch("/:cardId/:sizeId/:elementId", updateProductElement);

export default router;
