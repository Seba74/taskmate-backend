import { PrismaClient } from '@prisma/client'
import { CreateTaskStatus } from '../interfaces/taskStatus.dto'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class TasksStatusService {
	getTasksStatus = async () => {
		try {
			return prisma.taskStatus.findMany({ where: { status: true } })
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener los estados de las tareas', error.message)
			}

			throw new ErrorTM(
				'Error al obtener los estados de las tareas',
				'No se pudo obtener los estados de las tareas',
			)
		}
	}

	getTaskStatus = async (id: string) => {
		try {
			return prisma.taskStatus.findUnique({ where: { id, status: true } })
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener el estado de la tarea', error.message)
			}
			throw new ErrorTM(
				'Error al obtener el estado de la tarea',
				'No se pudo obtener el estado de la tarea',
			)
		}
	}

	createTaskStatus = async (data: CreateTaskStatus) => {
		try {
			const taskStatus = await prisma.taskStatus.findFirst({
				where: { description: data.description },
			})
			if (taskStatus) throw new ErrorMessage('Ya existe un elemento con esta descripción')

			return prisma.taskStatus.create({ data })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al crear el estado', error.message)
			}

			throw new ErrorTM('Error al crear el estado', 'No se pudo crear el estado')
		}
	}

	updateTaskStatus = async (id: string, data: CreateTaskStatus) => {
		try {
			const taskStatus = await prisma.taskStatus.findUnique({ where: { id, status: true } })
			if (!taskStatus) throw new ErrorMessage('No se encontró el estado de la tarea')

			return prisma.taskStatus.update({ where: { id }, data: { description: data.description } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al modificar el estado', error.message)
			}

			throw new ErrorTM('Error al modificar el estado', 'No se pudo modificar el estado')
		}
	}

	deleteTaskStatus = async (id: string) => {
		try {
			const taskStatus = await prisma.taskStatus.findUnique({ where: { id, status: true } })
			if (!taskStatus) throw new ErrorMessage('No se encontró el estado de la tarea')

			return prisma.taskStatus.update({ where: { id }, data: { status: false } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al eliminar el estado', error.message)
			}

			throw new ErrorTM('Error al eliminar el estado', 'No se pudo eliminar el estado')
		}
	}
}
