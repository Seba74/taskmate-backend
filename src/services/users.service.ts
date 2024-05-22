import { PrismaClient } from '@prisma/client'
import { UpdateUser } from '../interfaces/user.dto'
const prisma = new PrismaClient()

export class UsersService {
	getUsers = async () => {
		try {
			return prisma.user.findMany({ where: { status: true } })
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}

	getUser = async (id: string) => {
		try {
			return prisma.user.findUnique({ where: { id, status: true } })
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}

	updateUser = async (id: string, data: UpdateUser) => {
		try {
			const userExist = await prisma.user.findUnique({ where: { id, status: true } })
			if (!userExist) throw new Error('Usuario no encontrado')

			return prisma.user.update({
				where: { id },
				data: {
					name: data.name,
					last_name: data.last_name,
					profile_picture: data.profile_picture,
					email: data.email,
				},
			})
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}

	deleteUser = async (id: string) => {
		try {

			const userExist = await prisma.user.findUnique({ where: { id, status: true } })
			if (!userExist) throw new Error('Usuario no encontrado')

			return prisma.user.update({ where: { id }, data: { status: false } })
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}
}
