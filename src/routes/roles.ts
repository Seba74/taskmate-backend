import { Router } from 'express'
import { createRole, deleteRole, getRole, getRoles, updateRole } from '../controllers/roles.controller'
import { roleValidator } from '../validators/roles'
import { tokenAuthMiddleware } from '../middlewares/validateToken'

const router = Router()

router.get('/', tokenAuthMiddleware, getRoles)
router.get('/:id', tokenAuthMiddleware, getRole)
router.post('/', tokenAuthMiddleware, roleValidator, createRole)
router.delete('/:id', tokenAuthMiddleware, deleteRole)
router.put('/:id', tokenAuthMiddleware, roleValidator, updateRole)

export default router
