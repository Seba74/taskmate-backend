import { PrismaClient } from '@prisma/client'
import { CreateTask, UpdateTask } from '../interfaces/task.dto'
import { Role, TaskStatus } from '../helpers/enums'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'
import { addCollaborator } from '../controllers/projects.controller'
const prisma = new PrismaClient()

export class TasksService {
	createTask = async (data: CreateTask, userId: string) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: data.projectId } })
			if (!project) throw new ErrorMessage('El proyecto no existe')

			const roleAdmin = await prisma.role.findFirst({ where: { description: Role.Admin } })
			if (!roleAdmin) throw new ErrorMessage('No se encontró el rol de administrador')

			const collaborator = await prisma.collaborator.findFirst({
				where: { projectId: data.projectId, userId, roleId: roleAdmin.id },
			})
			if (!collaborator)
				throw new ErrorMessage('No tienes permisos para crear tareas en este proyecto')

			const taskStatusId = (
				await prisma.taskStatus.findFirst({ where: { description: TaskStatus.Pending } })
			).id
			if (!taskStatusId) throw new ErrorMessage('No se encontró el estado de la tarea')

			const task = await prisma.task.create({
				data: {
					description: data.description,
					endDate: data.endDate,
					projectId: project.id,
					taskStatusId: taskStatusId,
				},
			})

			return task
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al crear la tarea', error.message)
			}

			throw new ErrorTM('Error al crear la tarea', 'No se pudo crear la tarea')
		}
	}

	addCollaboratorToTask = async (taskId: string, collaboratorId: string) => {
		try {
			const task = await prisma.task.findUnique({ where: { id: taskId, status: true } })
			if (!task) throw new ErrorMessage('Tarea no encontrada')

			const project = await prisma.project.findUnique({ where: { id: task.projectId } })

			const collaborator = await prisma.collaborator.findUnique({
				where: { id: collaboratorId, projectId: project.id },
			})
			if (!collaborator) throw new ErrorMessage('Colaborador no encontrado')

			const cot = await prisma.collaboratorsOnTasks.create({
				data: { taskId, collaboratorId },
			})

			return cot
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al agregar el colaborador a la tarea', error.message)
			}

			throw new ErrorTM(
				'Error al agregar el colaborador a la tarea',
				'No se pudo agregar el colaborador a la tarea',
			)
		}
	}

	getTaskById = async (id: string) => {
		try {
			const task = await prisma.task.findUnique({
				where: { id, status: true },
				include: {
					collaboratorsOnTasks: {
						include: {
							collaborator: {
								select: {
									user: {
										select: { name: true, last_name: true, profile_picture: true },
									},
								},
							},
						},
					},
					taskResources: { select: { id: true, description: true, path: true } },
					taskStatus: { select: { description: true } },
				},
			})
			if (!task) throw new ErrorMessage('Tarea no encontrada')

			return task
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al obtener la tarea', error.message)
			}

			throw new ErrorTM('Error al obtener la tarea', 'No se pudo obtener la tarea')
		}
	}

	updateTask = async (id: string, data: UpdateTask) => {
		try {
			const task = await prisma.task.findUnique({ where: { id, status: true } })
			if (!task) throw new ErrorMessage('Tarea no encontrada')

			return prisma.task.update({ where: { id }, data: { ...data } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al actualizar la tarea', error.message)
			}

			throw new ErrorTM('Error al actualizar la tarea', 'No se pudo actualizar la tarea')
		}
	}

	deleteTask = async (id: string) => {
		try {
			const task = await prisma.task.findUnique({ where: { id, status: true } })
			if (!task) throw new ErrorMessage('Tarea no encontrada')

			return prisma.task.update({ where: { id }, data: { status: false } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al eliminar la tarea', error.message)
			}

			throw new ErrorTM('Error al eliminar la tarea', 'No se pudo eliminar la tarea')
		}
	}

	getTasksByProject = async (projectId: string) => {
		try {
			const tasks = await prisma.task.findMany({
				where: { projectId, status: true },
				include: {
					collaboratorsOnTasks: {
						include: {
							collaborator: {
								select: {
									user: {
										select: { name: true, last_name: true, profile_picture: true },
									},
								},
							},
						},
					},
					taskResources: { select: { id: true, description: true, path: true } },
					taskStatus: { select: { description: true } },
				},
			})
			if (!tasks) throw new ErrorMessage('No hay tareas en el proyecto')
			return tasks
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener las tareas', error.message)
			}

			throw new ErrorTM('Error al obtener las tareas', 'No se pudo obtener las tareas')
		}
	}

	getTasksByStatusAndProject = async (taskStatusId: string, projectId: string) => {
		try {
			const tasks = await prisma.task.findMany({
				where: { taskStatusId, projectId, status: true },
				include: { collaboratorsOnTasks: true, taskResources: true },
			})

			if (tasks.length === 0) throw new ErrorMessage('No hay tareas en el proyecto')

			return tasks
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener las tareas', error.message)
			}

			throw new ErrorTM('Error al obtener las tareas', 'No se pudo obtener las tareas')
		}
	}

	getTasksByCollaborator = async (collaboratorId: string) => {
		try {
			const collaboratorOnTask = await prisma.collaboratorsOnTasks.findMany({
				where: { collaboratorId, status: true },
				include: {
					task: {
						include: {
							collaboratorsOnTasks: {
								include: {
									collaborator: {
										select: {
											user: {
												select: { name: true, last_name: true, profile_picture: true },
											},
										},
									},
								},
							},
							taskResources: { select: { id: true, description: true, path: true } },
							taskStatus: { select: { description: true } },
						},
					},
				},
			})
			if (collaboratorOnTask.length === 0)
				throw new ErrorMessage('No hay tareas asignadas al colaborador')

			const tasks = collaboratorOnTask.map((cot) => cot.task)
			return tasks
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener las tareas', error.message)
			}

			throw new ErrorTM('Error al obtener las tareas', 'No se pudo obtener las tareas')
		}
	}
}
