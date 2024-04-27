import { Router } from "express";
import { login, checkToken, register } from "../controllers/auth.controller";
import { tokenAuthMiddleware } from "../middlewares/validateToken";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/check-token", tokenAuthMiddleware, checkToken);

export default router;
