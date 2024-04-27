import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany()
		handleSuccess(res, users)
	} catch (error) {
		handleError(res, error)
	}
}

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, last_name, email, password } = req.body

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
				last_name,
			},
		})

		handleSuccess(res, user)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const user = await prisma.user.delete({
			where: {
				id,
			},
		})

		handleSuccess(res, user)
	} catch (error) {
		handleError(res, error)
	}
}

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { name, email } = req.body

		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
			},
		})

		handleSuccess(res, user)
	} catch (error) {
		handleError(res, error)
	}
}