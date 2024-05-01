import { PrismaClient } from '@prisma/client'
import { CreateProject } from 'src/interfaces/project.dto'
const prisma = new PrismaClient()

export class ProjectsService {
	getProjects = async () => {
		try {
			return prisma.project.findMany()
		} catch (error) {
			return { name: 'Projects Error', message: error.message }
		}
	}
	
	createProjects = async (data: CreateProject) => {
		try {
			return prisma.project.create({data})
		} catch (error) {
			return { name: 'Projects Error', message: error.message }
		}
	}
}
