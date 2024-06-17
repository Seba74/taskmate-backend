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

			let taskStatusId: string
			if (data.taskStatus) {
				const taskStatus = await prisma.taskStatus.findFirst({
					where: { description: data.taskStatus },
				})
				if (!taskStatus) throw new ErrorMessage('No se encontró el estado de la tarea')
				taskStatusId = taskStatus.id
			} else {
				taskStatusId = (
					await prisma.taskStatus.findFirst({ where: { description: TaskStatus.Pending } })
				).id
			}
			if (!taskStatusId) throw new ErrorMessage('No se encontró el estado de la tarea')

			if (data.collaborators) {
				for (const collaboratorId of data.collaborators) {
					const collaboratorExists = await prisma.collaborator.findFirst({
						where: { projectId: project.id, id: collaboratorId },
					})
					if (!collaboratorExists) throw new ErrorMessage('El colaborador no existe')
				}
			}

			const task = await prisma.task.create({
				data: {
					description: data.description,
					endDate: data.endDate,
					projectId: project.id,
					taskStatusId: taskStatusId,
				},
			})

			if (data.collaborators) {
				for (const collaboratorId of data.collaborators) {
					const cot = await prisma.collaboratorsOnTasks.create({
						data: { taskId: task.id, collaboratorId },
					})
				}
			}

			const taskWithAllData = await prisma.task.findUnique({
				where: { id: task.id },
				select: {
					id: true,
					endDate: true,
					description: true,
					collaboratorsOnTasks: {
						include: {
							collaborator: {
								select: {
									id: true,
									user: {
										select: { name: true, last_name: true, profile_picture: true },
									},
									comments: { select: { id: true, description: true, createdAt: true } },
								},
							},
						},
					},
					taskResources: { select: { id: true, description: true, path: true } },
					taskStatus: { select: { description: true } },
				},
			})

			return taskWithAllData
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
				select: {
					id: true,
					endDate: true,
					description: true,
					collaboratorsOnTasks: {
						include: {
							collaborator: {
								select: {
									id: true,
									user: {
										select: { name: true, last_name: true, profile_picture: true },
									},
									comments: { select: { id: true, description: true, createdAt: true } },
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

			let taskStatusId: string
			if (data.taskStatus) {
				const taskStatus = await prisma.taskStatus.findFirst({
					where: { description: data.taskStatus },
				})
				if (!taskStatus) throw new ErrorMessage('No se encontró el estado de la tarea')
				taskStatusId = taskStatus.id
			}

			if (data.collaborators) {
				for (const collaboratorId of data.collaborators) {
					const collaboratorExists = await prisma.collaborator.findFirst({
						where: { projectId: task.projectId, id: collaboratorId },
					})
					if (!collaboratorExists) throw new ErrorMessage('El colaborador no existe')
				}
			}

			if (data.comments) {
				for (const c of data.comments) {
					const comment = await prisma.comments.create({
						data: { taskId: id, description: c.description, collaboratorId: c.collaboratorId },
					})

					if (!comment) throw new ErrorMessage('No se pudo agregar el comentario')
				}
			}

			await prisma.task.update({
				where: { id },
				data: {
					description: data.description,
					endDate: data.endDate,
					taskStatusId,
				},
			})

			if (data.collaborators) {
				await prisma.collaboratorsOnTasks.deleteMany({ where: { taskId: id } })
				for (const collaboratorId of data.collaborators) {
					const cot = await prisma.collaboratorsOnTasks.create({
						data: { taskId: id, collaboratorId },
					})
				}
			}

			const taskWithAllData = await prisma.task.findUnique({
				where: { id },
				select: {
					id: true,
					endDate: true,
					description: true,
					collaboratorsOnTasks: {
						include: {
							collaborator: {
								select: {
									id: true,
									user: {
										select: { name: true, last_name: true, profile_picture: true },
									},
									comments: { select: { id: true, description: true, createdAt: true } },
								},
							},
						},
					},
					taskResources: { select: { id: true, description: true, path: true } },
					taskStatus: { select: { description: true } },
				},
			})

			return taskWithAllData
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

	deleteAllTasks = async (projectId: string) => {
		try {
			const tasks = await prisma.task.findMany({ where: { projectId, status: true } })
			if (!tasks) throw new ErrorMessage('No hay tareas en el proyecto')

			return prisma.task.updateMany({ where: { projectId }, data: { status: false } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al eliminar las tareas', error.message)
			}

			throw new ErrorTM('Error al eliminar las tareas', 'No se pudo eliminar las tareas')
		}
	}

	getTasksByProject = async (projectId: string) => {
		try {
			const tasks = await prisma.task.findMany({
				where: { projectId, status: true },
				select: {
					id: true,
					endDate: true,
					description: true,
					collaboratorsOnTasks: {
						select: {
							collaborator: {
								select: {
									id: true,
									user: {
										select: { name: true, last_name: true, profile_picture: true },
									},
									comments: { select: { id: true, description: true, createdAt: true } },
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
}
