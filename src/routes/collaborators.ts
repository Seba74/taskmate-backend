import { Router } from 'express'
import { getCollaborators, asignCollaboratorToTask } from '../controllers/collaborators.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'

const router = Router()

router.get('/', tokenAuthMiddleware, getCollaborators)
router.post('/', tokenAuthMiddleware, asignCollaboratorToTask)

export default router
