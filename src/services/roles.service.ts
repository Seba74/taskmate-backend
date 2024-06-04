import { PrismaClient } from '@prisma/client'
import { CreateRole } from '../interfaces/role.dto'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class RolesService {
	getRoles = async () => {
		try {
			return prisma.role.findMany({ where: { status: true } })
		} catch (error) {
			throw new ErrorTM('Error al intentar cargar los roles', error.message)
		}
	}

	getRole = async (id: string) => {
		try {
			return prisma.role.findUnique({ where: { id, status: true } })
		} catch (error) {
			throw new ErrorTM('Error al obtener el rol', error.message)
		}
	}

	createRole = async (data: CreateRole) => {
		try {
			const role = await prisma.role.findFirst({ where: { description: data.description } })
			if (role) throw new Error('El Rol ya existe')

			return prisma.role.create({ data })
		} catch (error) {
			throw new ErrorTM('Error al intentar crear el rol', error.message)
		}
	}

	updateRole = async (id: string, data: CreateRole) => {
		try {
			return prisma.role.update({ where: { id }, data: { description: data.description } })
		} catch (error) {
			throw new ErrorTM('Error al intentar modificar el rol', error.message)
		}
	}

	deleteRole = async (id: string) => {
		try {
			return prisma.role.update({ where: { id }, data: { status: false } })
		} catch (error) {
			throw new ErrorTM('Error al intentar eliminar el role', error.message)
		}
	}
}
