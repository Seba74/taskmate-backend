import { Router } from 'express'
import {
	getTasksByProject,
	createTask,
	deleteTask,
	updateTask,
	getTaskById,
	addCollaboratorToTask,
	deleteAllTasks,
} from '../controllers/tasks.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { createTaskValidator } from '../validators/tasks'

const router = Router()

router.post('/:projectId', tokenAuthMiddleware, createTaskValidator, createTask)
router.post('/:id/collaborator/:collaboratorId', tokenAuthMiddleware, addCollaboratorToTask)
router.get('/project/:projectId', tokenAuthMiddleware, getTasksByProject)
router.get('/:id', tokenAuthMiddleware, getTaskById)
router.put('/:id', tokenAuthMiddleware, updateTask)
router.delete('/:id', tokenAuthMiddleware, deleteTask)
router.delete('/all/:projectId', tokenAuthMiddleware, deleteAllTasks)

export default router
