import { PrismaClient } from '@prisma/client'
import { CreateTaskStatus } from '../interfaces/taskStatus.dto'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class TasksStatusService {
	getTasksStatus = async () => {
		try {
			return prisma.taskStatus.findMany({ where: { status: true } })
		} catch (error) {
			throw new ErrorTM('TasksStatus Error', error.message)
		}
	}

	getTaskStatus = async (id: string) => {
		try {
			return prisma.taskStatus.findUnique({ where: { id, status: true } })
		} catch (error) {
			throw new ErrorTM('TasksStatus Error', error.message)
		}
	}

	createTaskStatus = async (data: CreateTaskStatus) => {
		try {
			const taskStatus = await prisma.taskStatus.findFirst({
				where: { description: data.description },
			})
			if (taskStatus) throw new Error('Ya existe un elemento con esta descripción')

			return prisma.taskStatus.create({ data })
		} catch (error) {
			throw new ErrorTM('TasksStatus Error', error.message)
		}
	}

	updateTaskStatus = async (id: string, data: CreateTaskStatus) => {
		try {
			const taskStatus = await prisma.taskStatus.findUnique({ where: { id, status: true } })
			if (!taskStatus) throw new Error('No se encontró el estado de la tarea')

			return prisma.taskStatus.update({ where: { id }, data: { description: data.description } })
		} catch (error) {
			throw new ErrorTM('TasksStatus Error', error.message)
		}
	}

	deleteTaskStatus = async (id: string) => {
		try {
			const taskStatus = await prisma.taskStatus.findUnique({ where: { id, status: true } })
			if (!taskStatus) throw new Error('No se encontró el estado de la tarea')

			return prisma.taskStatus.update({ where: { id }, data: { status: false } })
		} catch (error) {
			throw new ErrorTM('TasksStatus Error', error.message)
		}
	}
}
