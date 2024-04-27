import { Response } from 'express'

export const handleError = (res: Response, error: any) => {
	res.status(500).json({
		status: false,
		response: {
			data: null,
			errors: [
				{
					name: error.name,
					message: error.message,
				}
			],
		}
	})
}

export const handleSuccess = (res: Response, data: any) => {
	res.status(200).json({
		status: true,
		response: {
			data,
			errors: null,
		}
	})
}