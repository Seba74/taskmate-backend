import { PrismaClient } from '@prisma/client'
import { CreateTaskResource } from '../interfaces/taskResource.dto'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class TaskResourcesService {
	getTaskResources = async () => {
		try {
			const tasksStatus = await prisma.taskResource.findMany({ where: { status: true } })
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

	getTaskResource = async (id: string) => {
		try {
			const taskResource = prisma.taskResource.findUnique({
				where: { id, status: true },
				include: { taskResourceType: { select: { description: true } } },
			})
			if (!taskResource) throw new ErrorMessage('No se encontró el recurso de la tarea')

			return taskResource
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

	createTaskResource = async (data: CreateTaskResource) => {
		try {
			const taskResource = await prisma.taskResource.findFirst({
				where: { description: data.description },
			})
			if (taskResource) throw new ErrorMessage('Ya existe un elemento con esta descripción')

			const taskResourceType = await prisma.taskResourceType.findUnique({
				where: { description: data.resourceType },
			})
			if (!taskResourceType) throw new ErrorMessage('No existe el tipo de recurso')

			const createTaskResource = {
				description: data.description,
				taskId: data.taskId,
				path: data.path,
				taskResourceTypeId: taskResourceType.id,
			}

			const newTaskResource = prisma.taskResource.create({ data: createTaskResource })
			if (!newTaskResource) throw new ErrorMessage('No se pudo crear el recurso')

			return newTaskResource
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al crear el recurso', error.message)
			}

			throw new ErrorTM('Error al crear el recurso', 'No se pudo crear el recurso')
		}
	}
	
	deleteTaskResource = async (id: string) => {
		try {
			const taskResource = await prisma.taskResource.findUnique({
				where: { id, status: true },
			})
			if (!taskResource) throw new ErrorMessage('No se encontró el recurso de la tarea')

			return prisma.taskResource.update({ where: { id }, data: { status: false } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al eliminar el recurso', error.message)
			}

			throw new ErrorTM('Error al eliminar el recurso', 'No se pudo eliminar el recurso')
		}
	}
}
