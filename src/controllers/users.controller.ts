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
