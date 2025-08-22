import express from "express";
import {
  forgot_password,
  login,
  logout,
  register,
  Reset_password,
} from "../controllers/User.Controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot_password", forgot_password);
router.post("/Reset_password", Reset_password);

export default router;
