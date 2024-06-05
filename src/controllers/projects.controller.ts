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

export const getProjectsByUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params
		const projects = await projectsService.getProjectsByUser(userId)
		handleSuccess(res, projects)
	} catch (error) {
		handleError(res, error)
	}
}

export const createProject = async (req: any, res: Response) => {
	try {
		const { title, description, project_picture } = req.body
		const user = req.user
		const image = req.file

		const data = await projectsService.createProject({
			title,
			description,
			project_picture: image.filename,
			userId: user.id
		})
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}

export const addCollaborator = async (req: Request, res: Response) => {
	try {
		const { projectId, userId } = req.body

		const data = await projectsService.addCollaborator(projectId, userId)
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}
