import { Router } from "express";
import { register, login } from "../controllers/users";
import userRoute from "./users";
import auth from "../middlewares/auth";
import { loginValid, registerValid } from "../middlewares/validationJoi";
import ErrorNotFound from "../errors/ErrorNotFound";
const router = Router();

router.post("/signup", registerValid, register);
router.post("/signin", loginValid, login);

router.use(auth);

router.use("/users", userRoute);
// router.use("/cards", cardsRoute);

router.use((req, res, next) => {
  return next(new ErrorNotFound({ message: "Данный путь не найден" }));
});

export default router;
