import { Router } from "express";
import { register, login } from "../controllers/users";

import userRoute from "./users";
import apartmentRoute from "./apartments";
import auth from "../middlewares/auth";
import {
  loginValid,
  refreshTokenBodyValidation,
  registerValid,
} from "../middlewares/validationJoi";
import refreshTokenRoutes from "../routes/refreshToken";
import ErrorNotFound from "../errors/ErrorNotFound";
import { textErrorNotFound } from "../configs/text";
import {
  SIGNUP,
  SIGNIN,
  LOGOUT,
  USERS,
  APARTMENTS,
} from "../sharedPath/apiPaths";
const router = Router();

router.post(SIGNUP, registerValid, register);
router.post(SIGNIN, loginValid, login);
router.use(LOGOUT, refreshTokenBodyValidation, refreshTokenRoutes);

router.use(auth);

router.use(USERS, userRoute);
router.use(APARTMENTS, apartmentRoute);

router.use((req, res, next) => {
  return next(new ErrorNotFound({ message: textErrorNotFound }));
});

export default router;
