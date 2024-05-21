import { Router } from 'express'
import {createTaskStatus, deleteTaskStatus, getTaskStatus, getTasksStatus, updateTaskStatus} from '../controllers/tasks-status.controller'
import { roleValidator } from '../validators/roles'
import { tokenAuthMiddleware } from '../middlewares/validateToken'

const router = Router()

router.get('/', tokenAuthMiddleware, getTasksStatus)
router.get('/:id', tokenAuthMiddleware, getTasksStatus)
router.post('/', tokenAuthMiddleware, createTaskStatus)
router.delete('/:id', tokenAuthMiddleware, deleteTaskStatus)
router.put('/:id', tokenAuthMiddleware, updateTaskStatus)

export default router
