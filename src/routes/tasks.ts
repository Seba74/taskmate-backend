import { Router } from 'express'
import {
	getTasksByProject,
	getTasksByStatusAndProject,
	getTasksByCollaborator,
	createTask,
	deleteTask,
	updateTask,
	getTaskById,
} from '../controllers/tasks.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { createTaskValidator, updateTaskValidator } from '../validators/tasks'

const router = Router()

router.post('/:projectId', tokenAuthMiddleware, createTaskValidator, createTask)
router.get('/project/:projectId', tokenAuthMiddleware, getTasksByProject)
router.get('/:id', tokenAuthMiddleware, getTaskById)
router.get('/project/status', tokenAuthMiddleware, getTasksByStatusAndProject)
router.get('/collaborator/:collaboratorId', tokenAuthMiddleware, getTasksByCollaborator)
router.put('/:id', tokenAuthMiddleware, updateTaskValidator, updateTask)
router.delete('/:id', tokenAuthMiddleware, deleteTask)

export default router
