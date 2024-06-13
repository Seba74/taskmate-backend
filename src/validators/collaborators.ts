import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const collaboratorValidator = [
	check('collaboratorId').exists().withMessage('Se requiere un ID de colaborador'),
	check('taskId').exists().withMessage('Se requiere un ID de tarea'),
	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]

export const addCollaboratorValidator = [
	check('projectId').exists().withMessage('Se requiere un ID de proyecto'),
	check('userId').exists().withMessage('Se requiere un ID de usuario'),
	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]