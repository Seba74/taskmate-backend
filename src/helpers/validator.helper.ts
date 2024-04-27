import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validate = (req: Request, res : Response, next: NextFunction) => {
	try {
		const errors : any = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: false,
				response: {
					data: null,
					errors: errors.array().map((error: { path: string; msg: string })  => ({
						name: error.path,
						message: error.msg,
					})),
				}
			})
		}
		next()
	} catch (error) {
		next(error)
	}
}
