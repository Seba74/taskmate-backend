import { Router } from 'express'
import { createTaskResourceType, deleteTaskResourceType, getTaskResourcesType, updateTaskResourceType } from '../controllers/task-resources-type.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { taskResourcesTypeValidator } from '../validators/task-resources-type'

const router = Router()

router.post('/', tokenAuthMiddleware, taskResourcesTypeValidator, createTaskResourceType)
router.get('/', tokenAuthMiddleware, getTaskResourcesType)
router.get('/:id', tokenAuthMiddleware, getTaskResourcesType)
router.put('/:id', tokenAuthMiddleware, taskResourcesTypeValidator, updateTaskResourceType)
router.delete('/:id', tokenAuthMiddleware, deleteTaskResourceType)

export default router
