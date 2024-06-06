import { PrismaClient } from '@prisma/client'
import { CreateCollaboratorsOnTasks } from '../interfaces/collaboratorOnTasks.dto'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class CollaboratorsService {
	getCollaborators = async () => {
		try {
			return prisma.collaborator.findMany({ where: { status: true } })
		} catch (error) {
			if (error instanceof ErrorTM) {
				throw new ErrorTM('ErrorTM al obtener los colaboradores', error.message)
			}

			throw new ErrorTM(
				'ErrorTM al obtener los colaboradores',
				'No se pudo obtener los colaboradores',
			)
		}
	}

	asignCollaboratorToTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaborator = await prisma.collaborator.findUnique({
				where: { id: data.collaboratorId },
			})

			if (!collaborator) throw new ErrorTM('El colaborador no existe')

			const task = await prisma.task.findUnique({
				where: { id: data.taskId },
			})

			if (!task) throw new ErrorTM('La tarea no existe')

			const collaboratorOnTask = await prisma.collaboratorsOnTasks.create({
				data: {
					collaboratorId: collaborator.id,
					taskId: task.id,
				},
			})

			return collaboratorOnTask
		} catch (error) {
			if(error instanceof ErrorTM) {
				throw new ErrorTM('ErrorTM al intentar asignar al colaborador', error.message)
			}

			throw new ErrorTM('ErrorTM al intentar asignar al colaborador', 'No se pudo asignar al colaborador')
		}
	}

	deleteCollaboratorOnTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaboratorOnTask = await prisma.collaboratorsOnTasks.findFirst({
				where: { collaboratorId: data.collaboratorId, taskId: data.taskId },
			})

			if (!collaboratorOnTask) throw new ErrorTM('El colaborador no está asignado a la tarea')

			return prisma.collaboratorsOnTasks.delete({ where: { id: collaboratorOnTask.id } })
		} catch (error) {
			if(error instanceof ErrorTM) {
				throw new ErrorTM('ErrorTM al intentar eliminar al colaborador', error.message)
			}

			throw new ErrorTM('ErrorTM al intentar eliminar al colaborador', 'No se pudo eliminar al colaborador')
		}
	}
}
