import { Response, NextFunction } from 'express'
import { validateToken } from '../libs/jwt'
import { handleError } from '../helpers/response.helper'

export const tokenAuthMiddleware = async (req: any, res: Response, next: NextFunction) => {
	try {
		const token = req.headers['authorization']
		if (!token) return handleError(res, { name: 'Token Error', message: 'No token provided' })

		const getToken = token.split(' ')[1]
		const verifyToken = await validateToken(getToken)
		if (!verifyToken.accessToken)
			return handleError(res, { name: 'Token Error', message: 'Invalid token' })

		req.user = verifyToken.payload
		next()
	} catch (error) {
		handleError(res, error)
	}
}
