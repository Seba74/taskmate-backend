import { PrismaClient } from '@prisma/client'
import { CreateProject } from 'src/interfaces/project.dto'
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
}
