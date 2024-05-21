import { PrismaClient } from '@prisma/client'
import { User } from '../interfaces/user.dto'
const prisma = new PrismaClient()

export class UsersService {
	getUsers = async () => {
		try {
			return prisma.user.findMany()
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}

	getUser = async (id: string) => {
		try {
			return prisma.user.findUnique({ where: { id } })
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}

	updateUser = async (id: string, data: User) => {
		try {
			return prisma.user.update({
				where: { id },
				data: {
					name: data.name,
					last_name: data.last_name,
					profile_picture: data.profile_picture,
					email: data.email,
					status: data.status,
				},
			})
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}

	deleteUser = async (id: string) => {
		try {
			return prisma.user.update({ where: { id }, data: { status: false } })
		} catch (error) {
			return { name: 'Users Error', message: error.message }
		}
	}
}
