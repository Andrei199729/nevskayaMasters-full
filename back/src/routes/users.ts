import { Router } from "express";
import { getUsers, getUserId, getUserMe } from "../controllers/users";
import { ME, USERID } from "../sharedPath/apiPaths";
import auth from "../middlewares/auth";
import { parameterIdValid } from "../middlewares/validationJoi";

const router = Router();
router.get("/", auth, getUsers);
router.get(ME, auth, getUserMe);
router.get(USERID, auth, parameterIdValid("id"), getUserId);
// router.patch("/me", userValid, updateProfile);

export default router;
