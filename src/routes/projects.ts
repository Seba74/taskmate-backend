import { Router } from 'express'
import { getProjects, createProject, addCollaborator, getProjectsByUser, getProjectById, updateProject } from '../controllers/projects.controller'
import { projectValidator } from '../validators/projects'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { addCollaboratorValidator } from '../validators/collaborators'
import { upload } from '../libs/multer'

const router = Router()

router.get('/', tokenAuthMiddleware, getProjectsByUser)
router.get('/:id', tokenAuthMiddleware, getProjectById)
router.put('/:id', tokenAuthMiddleware, upload.single('image'), projectValidator, updateProject)
router.post('/', tokenAuthMiddleware,  upload.single('image'), projectValidator, createProject)
router.post('/add-collaborator', tokenAuthMiddleware, addCollaboratorValidator, addCollaborator)

export default router
