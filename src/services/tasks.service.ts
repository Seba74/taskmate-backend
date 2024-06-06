import { PrismaClient } from '@prisma/client'
import { CreateTask, UpdateTask } from '../interfaces/task.dto'
import { TaskStatus } from '../helpers/enums'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class TasksService {
	createTask = async (data: CreateTask) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: data.projectId } })
			if (!project) throw new ErrorTM('El proyecto no existe')

			const taskStatusId = (
				await prisma.taskStatus.findFirst({ where: { description: TaskStatus.OnProcess } })
			).id
			if (!taskStatusId) throw new ErrorTM('No se encontró el estado de la tarea')

			const task = await prisma.task.create({
				data: {
					description: data.description,
					start_date: data.start_date,
					end_date: data.end_date,
					projectId: project.id,
					taskStatusId: taskStatusId,
				},
			})

			return task
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al crear la tarea', error.message)
			}

			throw new ErrorTM('Error al crear la tarea', 'No se pudo crear la tarea')
		}
	}

	updateTask = async (id: string, data: UpdateTask) => {
		try {
			const task = await prisma.task.findUnique({ where: { id, status: true } })
			if (!task) throw new ErrorTM('Tarea no encontrada')

			return prisma.task.update({ where: { id }, data: { ...data } })
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al actualizar la tarea', error.message)
			}

			throw new ErrorTM('Error al actualizar la tarea', 'No se pudo actualizar la tarea')
		}
	}

	deleteTask = async (id: string) => {
		try {
			const task = await prisma.task.findUnique({ where: { id, status: true } })
			if (!task) throw new ErrorTM('Tarea no encontrada')

			return prisma.task.update({ where: { id }, data: { status: false } })
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al eliminar la tarea', error.message)
			}

			throw new ErrorTM('Error al eliminar la tarea', 'No se pudo eliminar la tarea')
		}
	}

	getTasksByProject = async (projectId: string) => {
		try {
			return prisma.task.findMany({
				where: { projectId, status: true },
				include: { collaboratorsOnTasks: true, taskResources: true },
			})
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener las tareas', error.message)
			}

			throw new ErrorTM('Error al obtener las tareas', 'No se pudo obtener las tareas')
		}
	}

	getTasksByStatusAndProject = async (taskStatusId: string, projectId: string) => {
		try {
			return prisma.task.findMany({
				where: { taskStatusId, projectId, status: true },
				include: { collaboratorsOnTasks: true, taskResources: true },
			})
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
						include: { collaboratorsOnTasks: true, taskResources: true },
					},
				},
			})
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
