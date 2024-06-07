import { PrismaClient } from '@prisma/client'
import { CreateTaskResourceType } from '../interfaces/taskResourceType.dto'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class TaskResourcesTypeService {
	getTaskResourcesType = async () => {
		try {
			const tasksStatus = await prisma.taskResourceType.findMany({ where: { status: true } })
			if (tasksStatus.length === 0) throw new ErrorMessage('No hay recursos de tareas registrados')

			return tasksStatus
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener los recursos de las tareas', error.message)
			}

			throw new ErrorTM(
				'Error al obtener los recursos de las tareas',
				'No se pudo obtener los recursos de las tareas',
			)
		}
	}

	getTaskResourceType = async (id: string) => {
		try {
			const taskResourceType = prisma.taskResourceType.findUnique({ where: { id, status: true } })
			if (!taskResourceType) throw new ErrorMessage('No se encontró el recurso de la tarea')

			return taskResourceType
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('Error al obtener el recurso de la tarea', error.message)
			}
			throw new ErrorTM(
				'Error al obtener el recurso de la tarea',
				'No se pudo obtener el recurso de la tarea',
			)
		}
	}

	createTaskResourceType = async (data: CreateTaskResourceType) => {
		try {
			const taskResourceType = await prisma.taskResourceType.findFirst({
				where: { description: data.description },
			})
			if (taskResourceType) throw new ErrorMessage('Ya existe un elemento con esta descripción')

			return prisma.taskResourceType.create({ data })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al crear el recurso', error.message)
			}

			throw new ErrorTM('Error al crear el recurso', 'No se pudo crear el recurso')
		}
	}

	updateTaskResourceType = async (id: string, data: CreateTaskResourceType) => {
		try {
			const taskResourceType = await prisma.taskResourceType.findUnique({
				where: { id, status: true },
			})
			if (!taskResourceType) throw new ErrorMessage('No se encontró el recurso de la tarea')

			return prisma.taskResourceType.update({
				where: { id },
				data: { description: data.description },
			})
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al modificar el recurso', error.message)
			}

			throw new ErrorTM('Error al modificar el recurso', 'No se pudo modificar el recurso')
		}
	}

	deleteTaskResourceType = async (id: string) => {
		try {
			const taskResourceType = await prisma.taskResourceType.findUnique({
				where: { id, status: true },
			})
			if (!taskResourceType) throw new ErrorMessage('No se encontró el recurso de la tarea')

			return prisma.taskResourceType.update({ where: { id }, data: { status: false } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al eliminar el recurso', error.message)
			}

			throw new ErrorTM('Error al eliminar el recurso', 'No se pudo eliminar el recurso')
		}
	}
}
