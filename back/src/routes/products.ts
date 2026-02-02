import { Router } from "express";
import {
  createProduct,
  deleteProductElement,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products";
import { ROOMID, SIZEID, ELEMENTID } from "../sharedPath/apiPaths";
import auth from "../middlewares/auth";
import {
  createProductValid,
  parameterIdsValid,
  parameterIdValid,
  updateProductValid,
} from "../middlewares/validationJoi";

const router = Router({ mergeParams: true });

router.get("/", auth, getProducts);
router.get(ROOMID, auth, parameterIdValid("cardId"), getProduct);
router.post("/", auth, createProductValid, createProduct);

router.patch(
  ROOMID,
  auth,
  parameterIdsValid("cardId", "apartmentId"),
  updateProductValid,
  updateProduct,
);
router.delete(
  `${ROOMID}${SIZEID}${ELEMENTID}`,
  auth,
  parameterIdsValid("cardId", "elementId", "sizeId", "apartmentId"),
  deleteProductElement,
);

export default router;
