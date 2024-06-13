import { TasksService } from '../services/tasks.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'

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

export const getTasksByStatusAndProject = async (req: Request, res: Response) => {
	try {
		const { taskStatusId, projectId } = req.body
		const task = await tasksService.getTasksByStatusAndProject(taskStatusId, projectId)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}

export const getTasksByCollaborator = async (req: Request, res: Response) => {
	try {
		const { collaboratorId } = req.params
		const task = await tasksService.getTasksByCollaborator(collaboratorId)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}

export const createTask = async (req: Request | any, res: Response) => {
	try {
		const { projectId } = req.params
		const { description, endDate } = req.body
		const userId = req.user.id

		const task = await tasksService.createTask({ projectId, description, endDate }, userId)
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

export const updateTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = req.body
		const task = await tasksService.updateTask(id, data)
		handleSuccess(res, task)
	} catch (error) {
		handleError(res, error)
	}
}
