import { Router } from "express";
import {
  createApartment,
  createApplication,
  deleteApplication,
  getApartment,
  getApartments,
  updateApartments,
} from "../controllers/apartments";
import productRoute from "./products";
import { APARTMENTID, ROOMS } from "../sharedPath/apiPaths";
import auth from "../middlewares/auth";
import {
  createApartmentValid,
  createApplicationValid,
  parameterIdsValid,
  updateApartmentsValid,
} from "../middlewares/validationJoi";

const router = Router();
router.use(`${APARTMENTID}${ROOMS}`, productRoute);

router.get("/", auth, getApartments);
router.get(APARTMENTID, auth, parameterIdsValid("apartmentId"), getApartment);
router.post("/", auth, createApplicationValid, createApplication);
router.patch(
  APARTMENTID,
  auth,
  parameterIdsValid("apartmentId"),
  createApartmentValid,
  createApartment,
);

router.patch(
  APARTMENTID,
  auth,
  parameterIdsValid("apartmentId"),
  updateApartmentsValid,
  updateApartments,
);
router.delete(
  APARTMENTID,
  auth,
  parameterIdsValid("apartmentId"),
  deleteApplication,
);

export default router;
