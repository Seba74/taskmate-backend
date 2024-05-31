import { PrismaClient } from '@prisma/client'
import { CreateCollaboratorsOnTasks } from '../interfaces/collaboratorOnTasks.dto'
import { ErrorTM } from '../helpers/error.helper'
const prisma = new PrismaClient()

export class CollaboratorsService {
	getCollaborators = async () => {
		try {
			return prisma.collaborator.findMany({ where: { status: true } })
		} catch (error) {
			throw new ErrorTM('Collaborators Error', error.message)
		}
	}

	asignCollaboratorToTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaborator = await prisma.collaborator.findUnique({
				where: { id: data.collaboratorId },
			})

			if (!collaborator) throw new Error('El colaborador no existe')

			const task = await prisma.task.findUnique({
				where: { id: data.taskId },
			})

			if (!task) throw new Error('La tarea no existe')

			const collaboratorOnTask = await prisma.collaboratorsOnTasks.create({
				data: {
					collaboratorId: collaborator.id,
					taskId: task.id,
				},
			})

			return collaboratorOnTask
		} catch (error) {
			throw new ErrorTM('Collaborators Error', error.message)
		}
	}

	deleteCollaboratorOnTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaboratorOnTask = await prisma.collaboratorsOnTasks.findFirst({
				where: { collaboratorId: data.collaboratorId, taskId: data.taskId },
			})

			if (!collaboratorOnTask) throw new Error('El colaborador no está asignado a la tarea')

			return prisma.collaboratorsOnTasks.delete({ where: { id: collaboratorOnTask.id } })
		} catch (error) {
			throw new ErrorTM('Collaborators Error', error.message)
		}
	}
}
