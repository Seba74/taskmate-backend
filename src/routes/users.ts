import { getUserTest, getUsers } from "../controllers/users.controller";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/test", getUserTest);

export default router;