import { PrismaClient } from '@prisma/client'
import { CreateProject } from '../interfaces/project.dto'
import { Role } from '../helpers/enums'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class ProjectsService {
	getProjects = async () => {
		try {
			const projects = await prisma.project.findMany({ where: { status: true } })
			if (projects.length === 0) throw new ErrorMessage('No hay proyectos')

			return projects
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
			if (!userExists) throw new ErrorMessage('El usuario no existe')

			const projects = await prisma.project.findMany({
				where: { status: true, collaborators: { some: { userId } } },
				include: {
					collaborators: {
						select: {
							id: true,
							role: { select: { description: true } },
							user: { select: { id: true, name: true, last_name: true, profile_picture: true } },
						},
					},
				},
			})
			return projects
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al obtener los proyectos', error.message)
			}

			throw new ErrorTM('Error al obtener los proyectos', 'No se pudo obtener los proyectos')
		}
	}

	getProjectById = async (projectId: string, userId: string) => {
		try {
			const collaborator = await prisma.collaborator.findFirst({
				where: { projectId, userId },
			})
			if (!collaborator) throw new ErrorMessage('El usuario no es colaborador del proyecto')

			const project = await prisma.project.findUnique({
				where: { id: projectId },
				include: {
					collaborators: {
						where: { status: true },
						select: {
							id: true,
							role: { select: { description: true } },
							user: { select: { name: true, last_name: true, profile_picture: true } },
							collaboratorsOnTasks: {
								select: {
									taskId: true,
								},
							},
						},
					},
					tasks: {
						where: { status: true },
						select: {
							id: true,
							description: true,
							endDate: true,
							taskStatus: { select: { description: true } },
							taskResources: { select: { id: true, description: true, path: true } },
							collaboratorsOnTasks: {
								select: {
									collaborator: {
										select: {
											id: true,
											user: { select: { name: true, last_name: true, profile_picture: true } },
											comments: {
												where: { status: true, taskId: { equals: '$task.id' } },
												select: { id: true, description: true, createdAt: true },
											},
										},
									},
								},
							},
						},
					},
				},
			})
			if (!project) throw new ErrorMessage('El proyecto no existe')

			return project
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al obtener el proyecto', error.message)
			}

			throw new ErrorTM('Error al obtener el proyecto', 'No se pudo obtener el proyecto')
		}
	}

	createProject = async (data: CreateProject) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: data.userId },
			})

			if (!user) throw new ErrorMessage('El usuario no existe')

			const project = await prisma.project.create({
				data: {
					title: data.title,
					description: data.description,
					project_picture: data.project_picture,
				},
			})

			await prisma.collaborator.create({
				data: {
					roleId: (await prisma.role.findFirst({ where: { description: Role.Admin } })).id,
					userId: user.id,
					projectId: project.id,
				},
			})

			const projectData = await prisma.project.findUnique({
				where: { id: project.id },
				select: {
					id: true,
					title: true,
					description: true,
					project_picture: true,
					createdAt: true,
					collaborators: {
						select: {
							id: true,
							role: { select: { description: true } },
							user: { select: { name: true, last_name: true, profile_picture: true } },
						},
					},
				},
			})

			return projectData
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al crear el proyecto', error.message)
			}

			throw new ErrorTM('Error al crear el proyecto', 'No se pudo crear el proyecto')
		}
	}

	addCollaborator = async (projectId: string, userId: string, currentUserId: string) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: projectId } })
			if (!project) throw new ErrorMessage('El proyecto no existe')

			const adminRoleId = (await prisma.role.findFirst({ where: { description: Role.Admin } })).id

			const collaboratorAdmin = await prisma.collaborator.findFirst({
				where: { projectId, userId: currentUserId, roleId: adminRoleId },
			})
			if (!collaboratorAdmin)
				throw new ErrorMessage('No tienes permisos para agregar colaboradores')

			const user = await prisma.user.findUnique({ where: { id: userId } })
			if (!user) throw new ErrorMessage('El usuario no existe')

			const collaboratorExists = await prisma.collaborator.findFirst({
				where: { projectId, userId },
			})
			if (collaboratorExists) throw new ErrorMessage('El colaborador ya existe')

			const roleId = (await prisma.role.findFirst({ where: { description: Role.Collaborator } })).id
			if (!roleId) throw new ErrorMessage('El rol del colaborador no existe')
			const collaborator = await prisma.collaborator.create({
				data: {
					roleId,
					userId: user.id,
					projectId: project.id,
				},
			})
			return collaborator
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al agregar al colaborador', error.message)
			}

			throw new ErrorTM('Error al agregar al colaborador', 'No se pudo agregar al colaborador')
		}
	}

	updateProject = async (projectId: string, data: CreateProject) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: projectId } })
			if (!project) throw new ErrorMessage('El proyecto no existe')

			const roleId = (await prisma.role.findFirst({ where: { description: Role.Admin } })).id
			if (!roleId) throw new ErrorMessage('El rol del colaborador no existe')

			const collaborator = await prisma.collaborator.findFirst({
				where: { projectId, userId: data.userId, roleId },
			})
			if (!collaborator) throw new ErrorMessage('No tienes permisos para actualizar el proyecto')

			const projectUpdated = await prisma.project.update({
				where: { id: projectId },
				data: {
					title: data.title,
					description: data.description,
					project_picture: data.project_picture,
				},
			})

			return projectUpdated
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al actualizar el proyecto', error.message)
			}

			throw new ErrorTM('Error al actualizar el proyecto', 'No se pudo actualizar el proyecto')
		}
	}

	deleteProject = async (projectId: string, userId: string) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: projectId } })
			if (!project) throw new ErrorMessage('El proyecto no existe')

			const roleId = (await prisma.role.findFirst({ where: { description: Role.Admin } })).id
			if (!roleId) throw new ErrorMessage('El rol del colaborador no existe')

			const collaborator = await prisma.collaborator.findFirst({
				where: { projectId, userId, roleId },
			})
			if (!collaborator) throw new ErrorMessage('No tienes permisos para eliminar el proyecto')

			const projectDeleted = await prisma.project.update({
				where: { id: projectId },
				data: { status: false },
			})

			return projectDeleted
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al eliminar el proyecto', error.message)
			}

			throw new ErrorTM('Error al eliminar el proyecto', 'No se pudo eliminar el proyecto')
		}
	}
}
