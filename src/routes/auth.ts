import { Router } from 'express'
import { login, checkToken, register } from '../controllers/auth.controller'
import { tokenAuthMiddleware } from '../middlewares/validateToken'
import { loginValidator, registerValidator } from '../validators/auth'

const router = Router()

router.post('/login', loginValidator, login)
router.post('/register', registerValidator, register)
router.post('/check-token', tokenAuthMiddleware, checkToken)

export default router
