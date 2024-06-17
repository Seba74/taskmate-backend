import { TasksService } from '../services/tasks.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'
import { UpdateTask } from 'src/interfaces/task.dto'

const tasksService = new TasksService()

export const getTasksByProject = async (req: Request, res: Response) => {
	try {
		const { projectId } = req.params
		const tasks = await tasksService.getTasksByProject(projectId)
		handleSuccess(res, tasks)
	} catch (error) {
		handleError(res, error)
	}
}

export const getTaskById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const task = await tasksService.getTaskById(id)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}

export const createTask = async (req: Request | any, res: Response) => {
	try {
		const { projectId } = req.params
		const { description, endDate, taskStatus, collaborators } = req.body
		const userId = req.user.id

		const task = await tasksService.createTask(
			{ projectId, description, endDate, taskStatus, collaborators },
			userId,
		)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}

export const addCollaboratorToTask = async (req: Request, res: Response) => {
	try {
		const { id, collaboratorId } = req.params
		const task = await tasksService.addCollaboratorToTask(id, collaboratorId)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const task = await tasksService.deleteTask(id)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteAllTasks = async (req: Request, res: Response) => {
	try {
		const { projectId } = req.params
		const task = await tasksService.deleteAllTasks(projectId)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}

export const updateTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { description, endDate, taskStatus, collaborators, comments } = req.body

		const data: UpdateTask = {
			id,
			description,
			endDate,
			taskStatus,
			collaborators,
			comments,
		}

		const task = await tasksService.updateTask(id, data)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}
