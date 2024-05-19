import { deleteUser, getUsers, updateUser } from '../controllers/users.controller'
import { Router } from 'express'

const router = Router()

router.get('/', getUsers)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

export default router
