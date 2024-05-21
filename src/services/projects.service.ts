import { PrismaClient } from '@prisma/client'
import { CreateProject } from '../interfaces/project.dto'
import { Role } from '../helpers/enums'
const prisma = new PrismaClient()

export class ProjectsService {
	getProjects = async () => {
		try {
			return prisma.project.findMany()
		} catch (error) {
			return { name: 'Projects Error', message: error.message }
		}
	}

	createProject = async (data: CreateProject) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: data.userId },
			})

			if (!user) return { name: 'Projects Error', message: 'El Usuario no existe' }

			const project = await prisma.project.create({
				data: {
					name: data.name,
					description: data.description,
					project_picture: data.project_picture,
				},
			})

			const collaborator = await prisma.collaborator.create({
				data: {
					roleId: (await prisma.role.findFirst({ where: { description: Role.Admin } })).id,
					userId: user.id,
					projectId: project.id,
				},
			})

			return { project, collaborator }
		} catch (error) {
			return { name: 'Projects Error', message: error.message }
		}
	}
}
