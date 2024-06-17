import { Response, Request } from 'express'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { ProjectsService } from '../services/projects.service'
import { CreateProject } from '../interfaces/project.dto'
import { removeImage, convertToWebp } from '../libs/multer'
import { DefaultImage } from '../helpers/enums'

const projectsService = new ProjectsService()

export const getProjects = async (req: Request, res: Response) => {
	try {
		const projects = await projectsService.getProjects()
		handleSuccess(res, projects)
	} catch (error) {
		handleError(res, error)
	}
}

export const getProjectsByUser = async (req: Request | any, res: Response) => {
	try {
		const user = req.user
		const projects = await projectsService.getProjectsByUser(user.id)
		handleSuccess(res, projects)
	} catch (error) {
		handleError(res, error)
	}
}

export const getProjectById = async (req: Request | any, res: Response) => {
	try {
		const { id } = req.params
		const user = req.user
		const project = await projectsService.getProjectById(id, user.id)
		handleSuccess(res, project)
	} catch (error) {
		handleError(res, error)
	}
}

export const createProject = async (req: any, res: Response) => {
	try {
		const { title, description } = req.body
		const user = req.user

		let imageName = ''
		if (!req.file) {
			imageName = DefaultImage.Project
		} else {
			imageName = await convertToWebp(req.file.buffer)
		}

		const data = await projectsService.createProject({
			title,
			description,
			project_picture: imageName,
			userId: user.id,
		})
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}

export const addCollaborator = async (req: Request | any, res: Response) => {
	try {
		const { projectId, userId } = req.body
		const user = req.user

		const data = await projectsService.addCollaborator(projectId, userId, user.id)
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}

export const updateProject = async (req: Request | any, res: Response) => {
	try {
		const { id } = req.params
		const { title, description } = req.body
		const user = req.user

		const currentProject = await projectsService.getProjectById(id, user.id)
		let imageName = currentProject.project_picture

		if (req.file) {
			removeImage(currentProject.project_picture)
			imageName = await convertToWebp(req)
		}

		const project: CreateProject = {
			title,
			description,
			userId: user.id,
			project_picture: imageName,
		}

		const data = await projectsService.updateProject(id, project)
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteProject = async (req: Request | any, res: Response) => {
	try {
		const { id } = req.params
		const user = req.user

		const data = await projectsService.deleteProject(id, user.id)
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}