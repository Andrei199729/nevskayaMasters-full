import { Router } from "express";
import { refreshTokenBodyValidation } from "../middlewares/validationJoi";
import { logout, refreshToken } from "../controllers/refreshToken";

const router = Router();

// get new access token
router.post("/", refreshTokenBodyValidation, refreshToken);

// logout
router.delete("/", refreshTokenBodyValidation, logout);

export default router;
