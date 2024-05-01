import { Router } from "express";
import { getProjects, createProjects } from '../controllers/projects.controller';
import { createProjectsValidator } from "../validators/projects";

const router = Router();

router.get("/", getProjects);
router.post("/", createProjectsValidator, createProjects);


export default router;