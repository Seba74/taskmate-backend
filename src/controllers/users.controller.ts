import { UsersService } from '../services/users.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'

const usersService = new UsersService()

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await usersService.getUsers()
		handleSuccess(res, users)
	} catch (error) {
		handleError(res, error)
	}
}

export const getUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const user = await usersService.getUser(id)
		handleSuccess(res, user)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const user = await usersService.deleteUser(id)
		handleSuccess(res, user)
	} catch (error) {
		handleError(res, error)
	}
}

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = req.body
		const user = await usersService.updateUser(id, data)
		handleSuccess(res, user)
	} catch (error) {
		handleError(res, error)
	}
}
