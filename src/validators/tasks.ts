import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const createTaskValidator = [
	check('description')
		.exists()
		.withMessage('Se requiere una descripción para crear una tarea')
		.isLength({ min: 3 })
		.withMessage('La descripción de una tarea debe tener al menos 3 caracteres'),
	check('endDate').exists().withMessage('Se requiere una fecha de fin para crear una tarea'),
	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]

export const updateTaskValidator = [
	check('description')
		.exists()
		.withMessage('Se requiere una descripción para actualizar una tarea')
		.isLength({ min: 3 })
		.withMessage('La descripción de una tarea debe tener al menos 3 caracteres'),
	check('endDate').exists().withMessage('Se requiere una fecha de fin para actualizar una tarea'),
	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]
