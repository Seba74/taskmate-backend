import { PrismaClient } from '@prisma/client'
import { CreateRole } from '../interfaces/role.dto'
const prisma = new PrismaClient()

export class RolesService {
	getRoles = async () => {
		try {
			return prisma.role.findMany({ where: { status: true }})
		} catch (error) {
			return { name: 'Roles Error', message: error.message }
		}
	}

	getRole = async (id: string) => {
		try {
			return prisma.role.findUnique({ where: { id, status: true } })
		} catch (error) {
			return { name: 'Roles Error', message: error.message }
		}
	}

	createRole = async (data: CreateRole) => {
		try {
			const role = await prisma.role.findFirst({ where: { description: data.description } })
			if (role) throw new Error('El Rol ya existe')

			return prisma.role.create({ data })
		} catch (error) {
			return { name: 'Roles Error', message: error.message }
		}
	}

	updateRole = async (id: string, data: CreateRole) => {
		try {
			return prisma.role.update({ where: { id }, data: { description: data.description } })
		} catch (error) {
			return { name: 'Roles Error', message: error.message }
		}
	}

	deleteRole = async (id: string) => {
		try {
			return prisma.role.update({ where: { id }, data: { status: false } })
		} catch (error) {
			return { name: 'Roles Error', message: error.message }
		}
	}
}
