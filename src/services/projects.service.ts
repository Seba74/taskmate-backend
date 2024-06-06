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
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener los proyectos', error.message)
			}

			throw new ErrorTM('Error al obtener los proyectos', 'No se pudo obtener los proyectos')
		}
	}

	getProjectsByUser = async (userId: string) => {
		try {
			const userExists = await prisma.user.findUnique({ where: { id: userId } })
			if (!userExists) throw new ErrorTM('El usuario no existe')

			const projects = await prisma.project.findMany({
				where: { status: true, collaborators: { some: { userId } } },
				include: { collaborators: true },
			})
			return projects
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener los proyectos', error.message)
			}

			throw new ErrorTM('Error al obtener los proyectos', 'No se pudo obtener los proyectos')
		}
	}

	createProject = async (data: CreateProject) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: data.userId },
			})

			if (!user) throw new ErrorTM('El usuario no existe')

			const project = await prisma.project.create({
				data: {
					name: data.title,
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
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al crear el proyecto', error.message)
			}

			throw new ErrorTM('Error al crear el proyecto', 'No se pudo crear el proyecto')
		}
	}

	addCollaborator = async (projectId: string, userId: string) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: projectId } })
			if (!project) throw new ErrorTM('El proyecto no existe')

			const user = await prisma.user.findUnique({ where: { id: userId } })
			if (!user) throw new ErrorTM('El usuario no existe')

			const collaboratorExists = await prisma.collaborator.findFirst({
				where: { projectId, userId },
			})
			if (collaboratorExists) throw new ErrorTM('El colaborador ya existe')

			const roleId = (await prisma.role.findFirst({ where: { description: Role.Collaborator } })).id
			if (!roleId) throw new ErrorTM('El rol del colaborador no existe')
			const collaborator = await prisma.collaborator.create({
				data: {
					roleId,
					userId: user.id,
					projectId: project.id,
				},
			})
			return collaborator
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al agregar al colaborador', error.message)
			}

			throw new ErrorTM('Error al agregar al colaborador', 'No se pudo agregar al colaborador')
		}
	}
}
