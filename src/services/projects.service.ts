import { PrismaClient } from '@prisma/client'
import { CreateProject } from '../interfaces/project.dto'
import { Role } from '../helpers/enums'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class ProjectsService {
	getProjects = async () => {
		try {
			return prisma.project.findMany({ where: { status: true } })
		} catch (error) {
			throw new ErrorTM('Projects Error', error.message)
		}
	}

	getProjectsByUser = async (userId: string) => {
		try {

			const userExists = await prisma.user.findUnique({ where: { id: userId } })
			if (!userExists) throw new Error('El usuario no existe')

			const projects = await prisma.project.findMany({
				where: { status: true, collaborators: { some: { userId } } },
				include: { collaborators: true },
			})
			return projects
		} catch (error) {
			throw new ErrorTM('Projects Error', error.message)
		}
	}

	createProject = async (data: CreateProject) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: data.userId },
			})

			if (!user) throw new Error('El usuario no existe')

			const project = await prisma.project.create({
				data: {
					name: data.name,
					description: data.description,
					project_picture: data.project_picture,
				},
			})

			const collaborator = await prisma.collaborator.create({
				data: {
					roleId: (await prisma.role.findFirst({ where: { description: Role.Admin } })).id,
					userId: user.id,
					projectId: project.id,
				},
			})

			return { project, collaborator }
		} catch (error) {
			throw new ErrorTM('Projects Error', error.message)
		}
	}

	addCollaborator = async (projectId: string, userId: string) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: projectId } })
			if (!project) throw new Error('El proyecto no existe')

			const user = await prisma.user.findUnique({ where: { id: userId } })
			if (!user) throw new Error('El usuario no existe')

			const collaborator = await prisma.collaborator.create({
				data: {
					roleId: (await prisma.role.findFirst({ where: { description: Role.Collaborator } })).id,
					userId: user.id,
					projectId: project.id,
				},
			})
			return collaborator
		} catch (error) {
			throw new ErrorTM('Projects Error', error.message)
		}
	}
}
