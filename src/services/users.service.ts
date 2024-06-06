import { PrismaClient } from '@prisma/client'
import { UpdateUser } from '../interfaces/user.dto'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class UsersService {
	getUsers = async () => {
		try {
			return prisma.user.findMany({ where: { status: true } })
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener los usuarios', error.message)
			}
			throw new ErrorTM('Error al obtener los usuarios', 'No se pudo obtener los usuarios')
		}
	}

	getUser = async (id: string) => {
		try {
			const user = prisma.user.findUnique({ where: { id, status: true } })
			if (!user) throw new ErrorTM('El usuario no existe')
			return user
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener el usuario', error.message)
			}
			throw new ErrorTM('Error al obtener el usuario', 'No se pudo obtener el usuario')
		}
	}

	updateUser = async (id: string, data: UpdateUser) => {
		try {
			const userExist = await prisma.user.findUnique({ where: { id, status: true } })
			if (!userExist) throw new ErrorTM('Usuario no encontrado')

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
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al actualizar el usuario', error.message)
			}
			throw new ErrorTM('Error al actualizar el usuario', 'No se pudo actualizar el usuario')
		}
	}

	deleteUser = async (id: string) => {
		try {
			const userExist = await prisma.user.findUnique({ where: { id, status: true } })
			if (!userExist) throw new ErrorTM('Usuario no encontrado')

			return prisma.user.update({ where: { id }, data: { status: false } })
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al eliminar el usuario', error.message)
			}
			throw new ErrorTM('Error al eliminar el usuario', 'No se pudo eliminar el usuario')
		}
	}
}
