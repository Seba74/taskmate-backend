import { Router } from 'express'
import { createTaskResource, deleteTaskResource, getTaskResource, getTaskResources, updateTaskResource } from '../controllers/task-resources.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { uploadTask } from '../libs/multer'

const router = Router()

router.post('/task/:taskId', tokenAuthMiddleware, uploadTask.single('file'), createTaskResource)
router.get('/task/:taskId', tokenAuthMiddleware, getTaskResources)
router.get('/:id/task/:taskId', tokenAuthMiddleware, getTaskResource)
router.put('/:id', tokenAuthMiddleware, updateTaskResource)
router.delete('/:id', tokenAuthMiddleware, deleteTaskResource)

export default router
