import { Router } from 'express'
import { getProjects, createProject, addCollaborator, getProjectsByUser } from '../controllers/projects.controller'
import { projectValidator } from '../validators/projects'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { addCollaboratorValidator } from '../validators/collaborators'

const router = Router()

router.get('/', tokenAuthMiddleware, getProjects)
router.get('/:userId', tokenAuthMiddleware, getProjectsByUser)
router.post('/', tokenAuthMiddleware, projectValidator, createProject)
router.post('/add-collaborator', tokenAuthMiddleware, addCollaboratorValidator, addCollaborator)

export default router
