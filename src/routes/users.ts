import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/users.controller'
import { Router } from 'express'

const router = Router()

router.get('/', tokenAuthMiddleware, getUsers)
router.get('/:id', tokenAuthMiddleware, getUser)
router.delete('/:id', tokenAuthMiddleware, deleteUser)
router.put('/:id', tokenAuthMiddleware, updateUser)

export default router
