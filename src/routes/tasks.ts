import { Router } from 'express'
import {
	getTasksByProject,
	getTasksByStatusAndProject,
	getTasksByCollaborator,
	createTask,
	deleteTask,
	updateTask,
	getTaskById,
	addCollaboratorToTask,
} from '../controllers/tasks.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { createTaskValidator } from '../validators/tasks'
import { collaboratorValidator } from '../validators/collaborators'

const router = Router()

router.post('/:projectId', tokenAuthMiddleware, createTaskValidator, createTask)
router.post('/:id/collaborator/:collaboratorId', tokenAuthMiddleware, addCollaboratorToTask)
router.get('/project/:projectId', tokenAuthMiddleware, getTasksByProject)
router.get('/:id', tokenAuthMiddleware, getTaskById)
router.get('/project/status', tokenAuthMiddleware, getTasksByStatusAndProject)
router.get('/collaborator/:collaboratorId', tokenAuthMiddleware, getTasksByCollaborator)
router.put('/:id', tokenAuthMiddleware, updateTask)
router.delete('/:id', tokenAuthMiddleware, deleteTask)

export default router
