import { PrismaClient } from '@prisma/client'
import { CreateRole } from '../interfaces/role.dto'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class RolesService {
	getRoles = async () => {
		try {
			const roles = await prisma.role.findMany({ where: { status: true } })
			if (roles.length === 0) throw new ErrorMessage('No hay roles registrados')

			return roles
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al obtener los roles', error.message)
			}

			throw new ErrorTM('Error al obtener los roles', 'No se pudo obtener los roles')
		}
	}

	getRole = async (id: string) => {
		try {
			const role = await prisma.role.findUnique({ where: { id, status: true } })
			if (!role) throw new ErrorMessage('El rol no existe o fue eliminado')

			return role
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener el rol', error.message)
			}
			throw new ErrorTM('Error al obtener el rol', 'No se pudo obtener el rol')
		}
	}

	createRole = async (data: CreateRole) => {
		try {
			const role = await prisma.role.findFirst({ where: { description: data.description } })
			if (role) throw new ErrorMessage('El Rol ya existe')

			return prisma.role.create({ data })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al crear el rol', error.message)
			}
			throw new ErrorTM('Error al crear el rol', 'No se pudo crear el rol')
		}
	}

	updateRole = async (id: string, data: CreateRole) => {
		try {
			const role = await prisma.role.update({
				where: { id },
				data: { description: data.description },
			})
			if (!role) throw new ErrorMessage('El rol no existe o ya fue eliminado')

			return role
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al intentar modificar el role', error.message)
			}

			throw new ErrorTM('Error al intentar modificar el role', 'No se pudo modificar el role')
		}
	}

	deleteRole = async (id: string) => {
		try {
			const role = await prisma.role.update({ where: { id }, data: { status: false } })
			if (!role) throw new ErrorMessage('El rol no existe o ya fue eliminado')

			return role
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al eliminar el rol', error.message)
			}

			throw new ErrorTM('Error al eliminar el rol', 'No se pudo eliminar el rol')
		}
	}
}
