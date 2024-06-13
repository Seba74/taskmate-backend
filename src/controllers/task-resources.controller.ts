import { TaskResourcesService } from '../services/task-resources.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'
import path from 'path'
import { saveFile } from '../libs/multer'
import { ErrorTM } from '../helpers/error.helper'

const taskResourcesTypeService = new TaskResourcesService()

export const getTaskResources = async (req: Request, res: Response) => {
	try {
		const taskResourcesType = await taskResourcesTypeService.getTaskResources()
		handleSuccess(res, taskResourcesType)
	} catch (error) {
		handleError(res, error)
	}
}

export const getTaskResource = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const taskResource = await taskResourcesTypeService.getTaskResource(id)
		handleSuccess(res, taskResource)
	} catch (error) {
		handleError(res, error)
	}
}

export const createTaskResource = async (req: Request, res: Response) => {
	try {
		const { taskId } = req.params
		const file = req.file
		if (!file) throw new ErrorTM('Error al subir el archivo', 'No se ha encontrado ningún archivo')
		const originalname = file.originalname
		const outputFilename = await saveFile(req)
		const ext = path.extname(outputFilename)
		const resourceType = ext === '.webp' ? 'image' : 'document'

		const taskResource = await taskResourcesTypeService.createTaskResource({
			description: originalname,
			path: outputFilename,
			taskId,
			resourceType,
		})
		handleSuccess(res, taskResource)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteTaskResource = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const taskResource = await taskResourcesTypeService.deleteTaskResource(id)
		handleSuccess(res, taskResource)
	} catch (error) {
		handleError(res, error)
	}
}
