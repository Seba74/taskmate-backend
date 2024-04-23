import { Response } from 'express'

export const handleError = (res: Response, error: any) => {
	res.status(500).json(error.message)
}
