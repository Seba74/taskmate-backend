import { Router } from 'express'
import { getCollaborators, asignCollaboratorToTask } from '../controllers/collaborators.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { collaboratorValidator } from '../validators/collaborators'

const router = Router()

router.get('/', tokenAuthMiddleware, getCollaborators)
router.post('/', tokenAuthMiddleware, collaboratorValidator, asignCollaboratorToTask)

export default router
