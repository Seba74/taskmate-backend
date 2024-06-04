import { PrismaClient } from '@prisma/client'
import { UpdateUser } from '../interfaces/user.dto'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class UsersService {
	getUsers = async () => {
		try {
			return prisma.user.findMany({ where: { status: true } })
		} catch (error) {
			throw new ErrorTM('Error al encontrar los usuarios', error.message)
		}
	}

	getUser = async (id: string) => {
		try {
			const user =  prisma.user.findUnique({ where: { id, status: true } })
			if(!user) throw new Error('El usuario no existe')
			return user
		} catch (error) {
			throw new ErrorTM('Error al encontrar el usuario', error.message)
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
			throw new ErrorTM('Error al actualizar los datos', error.message)
		}
	}

	deleteUser = async (id: string) => {
		try {
			const userExist = await prisma.user.findUnique({ where: { id, status: true } })
			if (!userExist) throw new Error('Usuario no encontrado')

			return prisma.user.update({ where: { id }, data: { status: false } })
		} catch (error) {
			throw new ErrorTM('Error al eliminar el usuario', error.message)
		}
	}
}
