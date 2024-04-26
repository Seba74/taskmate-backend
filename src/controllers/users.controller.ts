import { handleError } from '../utils/error.handle'
import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			},
		})

		res.status(200).json(users)
	} catch (error) {
		handleError(res, error)
	}
}

export const getUserTest = async (req: Request, res: Response) => {
	try {
		res.status(200).json('User test route works')
	} catch (error) {
		handleError(res, error)
	}
}

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email } = req.body

		const user = await prisma.user.create({
			data: {
				name,
				email,
			},
		})

		res.status(201).json(user)
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

		res.status(200).json(user)
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

		res.status(200).json(user)
	} catch (error) {
		handleError(res, error)
	}
}