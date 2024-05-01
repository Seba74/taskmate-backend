import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'
import { ProjectsService } from '../services/projects.service'

const projectsService = new ProjectsService()

export const getProjects = async (req: Request, res: Response) => {
	try {
		const projects = await projectsService.getProjects()
		handleSuccess(res, projects)
	} catch (error) {
		handleError(res, error)
	}
}