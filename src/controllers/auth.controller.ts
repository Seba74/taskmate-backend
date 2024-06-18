import { handleError, handleSuccess } from '../helpers/response.helper'
import { Response, Request } from 'express'
import { AuthService } from '../services/auth.service'
import { Payload } from '../interfaces/auth.dto'

const authService = new AuthService()

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const data = await authService.login({ email, password })
		
		handleSuccess(res, data)
	} catch (error) {
		handleError(res, error)
	}
}

export const register = async (req: Request, res: Response) => {
	try {
		const { name, last_name, email, password, profile_picture } = req.body
		const token = await authService.register({ name, last_name, email, password, profile_picture})
		handleSuccess(res, token)
	} catch (error) {
		handleError(res, error)
	}
}

export const checkToken = async (req: any, res: Response) => {
	try {
		const token: Payload = req.user
		const newToken = await authService.checkToken(token)
		handleSuccess(res, newToken)
	} catch (error) {
		handleError(res, error)
	}
}
