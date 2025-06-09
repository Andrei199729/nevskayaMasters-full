import { Router } from "express";
import { getUsers, getUserId, addUser } from "../controllers/users";
// import {
//   getUsers,
//   getUserId,
//   updateProfile,
//   updateAvatar,
//   getUserMe,
// } from "../controllers/users";
// import {
//   userValid,
//   parameterIdValid,
//   userAvatarValid,
// } from "../middlewares/validationJoi";

const router = Router();
router.get("/", getUsers);
router.post("/", addUser);
// router.get("/me", getUserMe);
// router.get("/:userId", parameterIdValid("userId"), getUserId);
router.get("/:id", getUserId);
// router.patch("/me", userValid, updateProfile);

export default router;
