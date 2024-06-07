import { PrismaClient } from '@prisma/client'
import { CreateCollaboratorsOnTasks } from '../interfaces/collaboratorOnTasks.dto'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class CollaboratorsService {
	getCollaborators = async () => {
		try {
			const collaborator = await prisma.collaborator.findMany({ where: { status: true } })
			if (!collaborator) throw new ErrorMessage('No hay colaboradores')

			return collaborator
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al obtener los colaboradores', error.message)
			}

			throw new ErrorTM(
				'Error al obtener los colaboradores',
				'No se pudo obtener los colaboradores',
			)
		}
	}

	asignCollaboratorToTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaborator = await prisma.collaborator.findUnique({
				where: { id: data.collaboratorId },
			})

			if (!collaborator) throw new ErrorMessage('El colaborador no existe')

			const task = await prisma.task.findUnique({
				where: { id: data.taskId },
			})

			if (!task) throw new ErrorMessage('La tarea no existe')

			const collaboratorOnTask = await prisma.collaboratorsOnTasks.create({
				data: {
					collaboratorId: collaborator.id,
					taskId: task.id,
				},
			})

			return collaboratorOnTask
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al intentar asignar al colaborador', error.message)
			}

			throw new ErrorTM(
				'Error al intentar asignar al colaborador',
				'No se pudo asignar al colaborador',
			)
		}
	}

	deleteCollaboratorOnTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaboratorOnTask = await prisma.collaboratorsOnTasks.findFirst({
				where: { collaboratorId: data.collaboratorId, taskId: data.taskId },
			})

			if (!collaboratorOnTask) throw new ErrorMessage('El colaborador no está asignado a la tarea')

			return prisma.collaboratorsOnTasks.delete({ where: { id: collaboratorOnTask.id } })
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al intentar eliminar al colaborador', error.message)
			}

			throw new ErrorTM(
				'Error al intentar eliminar al colaborador',
				'No se pudo eliminar al colaborador',
			)
		}
	}
}
