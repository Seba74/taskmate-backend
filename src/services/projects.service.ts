import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class ProjectsService {
	getProjects = async () => {
		try {
			return prisma.project.findMany()
		} catch (error) {
			return { name: 'Projects Error', message: error.message }
		}
	}
}
