import { Router } from 'express'
import { getProjects, createProject, addCollaborator, getProjectsByUser } from '../controllers/projects.controller'
import { projectValidator } from '../validators/projects'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { addCollaboratorValidator } from '../validators/collaborators'
import upload from '../libs/multer'

const router = Router()

router.get('/', tokenAuthMiddleware, getProjects)
router.get('/:userId', tokenAuthMiddleware, getProjectsByUser)
router.post('/', tokenAuthMiddleware,  upload.single('image'), projectValidator, createProject)
router.post('/add-collaborator', tokenAuthMiddleware, addCollaboratorValidator, addCollaborator)

export default router
