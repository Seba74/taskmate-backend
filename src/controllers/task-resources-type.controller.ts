import { TaskResourcesTypeService } from '../services/task-resources-type.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'

const taskResourcesTypeService = new TaskResourcesTypeService()

export const getTaskResourcesType = async (req: Request, res: Response) => {
	try {
		const taskResourcesType = await taskResourcesTypeService.getTaskResourcesType()
		handleSuccess(res, taskResourcesType)
	} catch (error) {
		handleError(res, error)
	}
}

export const getTaskResourceType = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const taskResourceType = await taskResourcesTypeService.getTaskResourceType(id)
		handleSuccess(res, taskResourceType)
	} catch (error) {
		handleError(res, error)
	}
}

export const createTaskResourceType = async (req: Request, res: Response) => {
	try {
		const { description } = req.body
		const taskResourceType = await taskResourcesTypeService.createTaskResourceType({ description })
		handleSuccess(res, taskResourceType)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteTaskResourceType = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const taskResourceType = await taskResourcesTypeService.deleteTaskResourceType(id)
		handleSuccess(res, taskResourceType)
	} catch (error) {
		handleError(res, error)
	}
}

export const updateTaskResourceType = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = req.body
		const taskResourceType = await taskResourcesTypeService.updateTaskResourceType(id, data)
		handleSuccess(res, taskResourceType)
	} catch (error) {
		handleError(res, error)
	}
}
