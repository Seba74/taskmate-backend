import { Router } from 'express'
import {
	createTaskStatus,
	deleteTaskStatus,
	getTasksStatus,
	updateTaskStatus,
} from '../controllers/tasks-status.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { taskStatusValidator } from '../validators/tasks-status'

const router = Router()

router.get('/', tokenAuthMiddleware, getTasksStatus)
router.get('/:id', tokenAuthMiddleware, getTasksStatus)
router.post('/', tokenAuthMiddleware, taskStatusValidator, createTaskStatus)
router.delete('/:id', tokenAuthMiddleware, deleteTaskStatus)
router.put('/:id', tokenAuthMiddleware, taskStatusValidator, updateTaskStatus)

export default router
