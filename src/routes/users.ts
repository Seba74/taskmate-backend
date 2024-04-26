import { createUser, deleteUser, getUserTest, getUsers, updateUser } from "../controllers/users.controller";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/test", getUserTest);

export default router;