import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const UpdateUserValidator = [
	check('name')
		.exists()
		.withMessage('Se requiere un nombre')
		.isLength({ min: 3 })
		.withMessage('El nombre debe tener al menos 3 caracteres'),
	check('last_name')
		.exists()
		.withMessage('Se requiere un apellido')
		.isLength({ min: 3 })
		.withMessage('El apellido debe tener al menos 3 caracteres'),
	check('profile_picture')
		.exists()
		.withMessage('Se requiere una foto de perfil')
		.isURL()
		.withMessage('La foto de perfil debe ser una URL válida'),
	check('email')
		.exists()
		.withMessage('Se requiere un correo electrónico')
		.isEmail()
		.withMessage('El correo electrónico debe ser válido'),
	(req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]
