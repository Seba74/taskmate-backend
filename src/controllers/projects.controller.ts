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

export const createProjects = async (req: Request, res: Response) => {
	try {
		const { name, description, project_picture, userId } = req.body

		const data = await projectsService.createProject({
			name,
			description,
			project_picture,
			userId,
		})
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}
