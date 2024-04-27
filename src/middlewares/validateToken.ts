import { Response, NextFunction } from 'express'
import { validateToken } from '../config/jwt'
import { handleError } from '../helpers/response.helper'

export const tokenAuthMiddleware = async (req: any, res: Response, next: NextFunction) => {
	try {
		const token = req.headers['authorization']
		if (!token)
			return handleError(res, { error: { name: 'Token Error', message: 'Token is required' } })

		const getToken = token.split(' ')[1]
		const verifyToken = await validateToken(getToken)
		if (!verifyToken.accessToken)
			return handleError(res, { error: { name: 'Token Error', message: 'Invalid token' } })

		req.user = verifyToken.payload
		next()
	} catch (error) {
		handleError(res, error)
	}
}
