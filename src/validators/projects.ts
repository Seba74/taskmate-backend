import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const projectValidator = [
	check('title')
		.exists()
		.withMessage('Se requiere un titulo para el proyecto')
		.isLength({ min: 3 })
		.withMessage('El titulo del proyecto debe tener al menos 3 caracteres'),
	check('description')
		.exists()
		.withMessage('Se requiere una descripción del proyecto')
		.isLength({ min: 3 })
		.withMessage('La descripción del proyecto debe tener al menos 3 caracteres'),

	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]
