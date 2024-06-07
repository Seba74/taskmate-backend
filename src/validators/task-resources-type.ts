import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const taskResourcesTypeValidator = [
	check('description')
		.exists()
		.withMessage('Se requiere una descripción del tipo de recurso de una tarea')
		.isLength({ min: 3 })
		.withMessage('La descripción del tipo de recurso de una tarea debe tener al menos 3 caracteres'),
	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]
