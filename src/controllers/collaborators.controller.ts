import { CollaboratorsService } from '../services/collaborators.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'

const collaboratorsService = new CollaboratorsService()

export const getCollaborators = async (req: Request, res: Response) => {
	try {
		const collaborators = await collaboratorsService.getCollaborators()
		handleSuccess(res, collaborators)
	} catch (error) {
		handleError(res, error)
	}
}

export const asignCollaboratorToTask = async (req: Request, res: Response) => {
	try {
		const { collaboratorId, taskId } = req.body
		const collaboratorOnTask = await collaboratorsService.asignCollaboratorToTask({
			collaboratorId,
			taskId,
		})
		handleSuccess(res, collaboratorOnTask)
	} catch (error) {
		handleError(res, error)
	}
}
