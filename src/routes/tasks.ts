import { Router } from 'express'
import {
	getTasksByProject,
	getTasksByStatusAndProject,
	getTasksByCollaborator,
	createTask,
	deleteTask,
	updateTask,
} from '../controllers/tasks.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { createTaskValidator, updateTaskValidator } from '../validators/tasks'

const router = Router()

router.post('/:projectId', tokenAuthMiddleware, createTaskValidator, createTask)
router.get('/:projectId', tokenAuthMiddleware, getTasksByProject)
router.get('/project/status', tokenAuthMiddleware, getTasksByStatusAndProject)
router.get('/collaborator/:collaboratorId', tokenAuthMiddleware, getTasksByCollaborator)
router.delete('/:id', tokenAuthMiddleware, deleteTask)
router.put('/:id', tokenAuthMiddleware, updateTaskValidator, updateTask)

export default router
