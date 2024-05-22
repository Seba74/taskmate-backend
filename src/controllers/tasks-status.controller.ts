import { TasksStatusService } from '../services/tasks-status.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'

const tasksStatusService = new TasksStatusService()

export const getTasksStatus = async (req: Request, res: Response) => {
	try {
		const tasksStatus = await tasksStatusService.getTasksStatus()
		handleSuccess(res, tasksStatus)
	} catch (error) {
		handleError(res, error)
	}
}

export const getTaskStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const taskStatus = await tasksStatusService.getTaskStatus(id)
		handleSuccess(res, taskStatus)
	} catch (error) {
		handleError(res, error)
	}
}

export const createTaskStatus = async (req: Request, res: Response) => {
	try {
		const { description } = req.body
		const taskStatus = await tasksStatusService.createTaskStatus({ description })
		handleSuccess(res, taskStatus)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteTaskStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const taskStatus = await tasksStatusService.deleteTaskStatus(id)
		handleSuccess(res, taskStatus)
	} catch (error) {
		handleError(res, error)
	}
}

export const updateTaskStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = req.body
		const taskStatus = await tasksStatusService.updateTaskStatus(id, data)
		handleSuccess(res, taskStatus)
	} catch (error) {
		handleError(res, error)
	}
}
