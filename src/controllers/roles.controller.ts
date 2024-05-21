import { RolesService } from '../services/roles.service'
import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'

const rolesService = new RolesService()

export const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = await rolesService.getRoles()
		handleSuccess(res, roles)
	} catch (error) {
		handleError(res, error)
	}
}

export const getRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const role = await rolesService.getRole(id)
		handleSuccess(res, role)
	} catch (error) {
		handleError(res, error)
	}
}

export const createRole = async (req: Request, res: Response) => {
	try {
		const { description } = req.body
		const role = await rolesService.createRole({ description })
		handleSuccess(res, role)
	} catch (error) {
		handleError(res, error)
	}
}

export const deleteRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const role = await rolesService.deleteRole(id)
		handleSuccess(res, role)
	} catch (error) {
		handleError(res, error)
	}
}

export const updateRole = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = req.body
		const role = await rolesService.updateRole(id, data)
		handleSuccess(res, role)
	} catch (error) {
		handleError(res, error)
	}
}
