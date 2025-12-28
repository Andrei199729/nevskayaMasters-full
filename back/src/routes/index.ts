import { Router } from "express";
import { register, login } from "../controllers/users";
import userRoute from "./users";
import apartamentRoute from "./apartaments";
import auth from "../middlewares/auth";
import {
  loginValid,
  refreshTokenBodyValidation,
  registerValid,
} from "../middlewares/validationJoi";
import refreshTokenRoutes from "../routes/refreshToken";
import ErrorNotFound from "../errors/ErrorNotFound";
const router = Router();

router.post("/signup", registerValid, register);
router.post("/signin", loginValid, login);
router.use("/logout", refreshTokenBodyValidation, refreshTokenRoutes);

router.use(auth);

router.use("/users", userRoute);
router.use("/apartaments", apartamentRoute);

router.use((req, res, next) => {
  return next(new ErrorNotFound({ message: "Данный путь не найден" }));
});

export default router;
