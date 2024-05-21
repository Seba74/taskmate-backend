import { Router } from 'express'
import { getProjects, createProjects } from '../controllers/projects.controller'
import { createProjectsValidator } from '../validators/projects'
import { tokenAuthMiddleware } from '../middlewares/validateToken'

const router = Router()

router.get('/', tokenAuthMiddleware, getProjects)
router.post('/', tokenAuthMiddleware, createProjectsValidator, createProjects)

export default router
