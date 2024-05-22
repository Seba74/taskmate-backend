import { PrismaClient } from '@prisma/client'
import { CreateTask, UpdateTask } from '../interfaces/task.dto'
import { TaskStatus } from '../helpers/enums'
const prisma = new PrismaClient()

export class TasksService {
	createTask = async (data: CreateTask) => {
		try {
			const project = await prisma.project.findUnique({ where: { id: data.projectId } })
			if (!project) throw new Error('El proyecto no existe')

			const task = await prisma.task.create({
				data: {
					description: data.description,
					start_date: data.start_date,
					end_date: data.end_date,
					projectId: project.id,
					taskStatusId: (
						await prisma.taskStatus.findFirst({ where: { description: TaskStatus.OnProcess } })
					).id,
				},
			})

			return task
		} catch (error) {
			return { name: 'Tasks Error', message: error.message }
		}
	}

	updateTask = async (id: string, data: UpdateTask) => {
		try {
			const task = await prisma.task.findUnique({ where: { id, status: true } })
			if (!task) throw new Error('Tarea no encontrada')

			return prisma.task.update({ where: { id }, data: { ...data } })
		} catch (error) {
			return { name: 'Tasks Error', message: error.message }
		}
	}

	deleteTask = async (id: string) => {
		try {
			const task = await prisma.task.findUnique({ where: { id, status: true } })
			if (!task) throw new Error('Tarea no encontrada')

			return prisma.task.update({ where: { id }, data: { status: false } })
		} catch (error) {
			return { name: 'Tasks Error', message: error.message }
		}
	}

	getTasksByProject = async (projectId: string) => {
		try {
			return prisma.task.findMany({
				where: { projectId, status: true },
				include: { collaboratorsOnTasks: true, taskResources: true },
			})
		} catch (error) {
			return { name: 'Tasks Error', message: error.message }
		}
	}

	getTasksByStatusAndProject = async (taskStatusId: string, projectId: string) => {
		try {
			return prisma.task.findMany({
				where: { taskStatusId, projectId, status: true },
				include: { collaboratorsOnTasks: true, taskResources: true },
			})
		} catch (error) {
			return { name: 'Tasks Error', message: error.message }
		}
	}

	getTasksByCollaborator = async (collaboratorId: string) => {
		try {
			const collaboratorOnTask = await prisma.collaboratorsOnTasks.findMany({
				where: { collaboratorId, status: true },
				include: {
					task: {
						include: { collaboratorsOnTasks: true, taskResources: true },
					},
				},
			})
			const tasks = collaboratorOnTask.map((cot) => cot.task)
			return tasks
		} catch (error) {
			return { name: 'Tasks Error', message: error.message }
		}
	}
}
