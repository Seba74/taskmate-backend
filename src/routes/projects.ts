import { Router } from 'express'
import { getProjects, createProjects, addCollaborator } from '../controllers/projects.controller'
import { projectValidator } from '../validators/projects'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { addCollaboratorValidator } from '../validators/collaborators'

const router = Router()

router.get('/', tokenAuthMiddleware, getProjects)
router.post('/', tokenAuthMiddleware, projectValidator, createProjects)
router.post('/add-collaborator', tokenAuthMiddleware, addCollaboratorValidator, addCollaborator)

export default router
