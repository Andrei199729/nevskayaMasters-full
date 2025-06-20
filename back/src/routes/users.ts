import { Router } from "express";
import { getUsers, getUserId, addUser, getUserMe } from "../controllers/users";

// import {
//   userValid,
//   parameterIdValid,
//   userAvatarValid,
// } from "../middlewares/validationJoi";

const router = Router();
router.get("/", getUsers);
router.get("/me", getUserMe);
router.post("/", addUser);
// router.get("/:userId", parameterIdValid("userId"), getUserId);
router.get("/:id", getUserId);
// router.patch("/me", userValid, updateProfile);

export default router;
