import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const roleValidator = [
	check('description')
		.exists()
		.withMessage('Se requiere una descripción del rol')
		.isLength({ min: 3 })
		.withMessage('La descripción del rol debe tener al menos 3 caracteres'),
	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]
