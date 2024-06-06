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
		const { title, description } = req.body
		const user = req.user
		let image = ''
		if(!req.file) image = '0d1dc1a6338f.png'
		else image = req.file.filename

		const data = await projectsService.createProject({
			title,
			description,
			project_picture: image,
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
