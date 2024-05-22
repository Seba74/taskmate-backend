import {  PrismaClient } from '@prisma/client'
import { CreateProject } from '../interfaces/project.dto'
import {CreateCollaboratorsOnTasks} from '../interfaces/collaboratorOnTasks.dto'
const prisma = new PrismaClient()

export class CollaboratorsService {
	getCollaborators = async () => {
		try {
			return prisma.collaborator.findMany()
		} catch (error) {
			return { name: 'Collaborators Error', message: error.message }
		}
	}

	createCollaborators = async (data: CreateProject) => {
		try {
			return prisma.project.create({ data })
		} catch (error) {
			return { name: 'Collaborators Error', message: error.message }
		}
	}

	asignCollaboratorToTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaborator = await prisma.collaborator.findUnique({
				where: { id: data.collaboratorId },
			})

			if (!collaborator) return { name: 'Collaborators Error', message: 'El colaborador no existe' }

			const task = await prisma.task.findUnique({
				where: { id: data.taskId },
			})

			if (!task) return { name: 'Collaborators Error', message: 'La tarea no existe' }

			const collaboratorOnTask = await prisma.collaboratorsOnTasks.create({
				data: {
					collaboratorId: collaborator.id,
					taskId: task.id,
				},
			})

			return collaboratorOnTask
		} catch (error) {
			return { name: 'Collaborators Error', message: error.message }
		}
	}

	deleteCollaboratorOnTask = async (data: CreateCollaboratorsOnTasks) => {
		try {
			const collaboratorOnTask = await prisma.collaboratorsOnTasks.findFirst({
				where: { collaboratorId: data.collaboratorId, taskId: data.taskId },
			})

			if (!collaboratorOnTask) return { name: 'Collaborators Error', message: 'El colaborador no esta asignado a la tarea' }

			return prisma.collaboratorsOnTasks.delete({ where: { id: collaboratorOnTask.id } })
		} catch (error) {
			return { name: 'Collaborators Error', message: error.message }
		}
	}
}
