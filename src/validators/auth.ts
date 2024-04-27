import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const loginValidator = [
    check('email').isEmail().withMessage('El correo electrónico no es válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña no es válida'),
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]

export const registerValidator = [
    check('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('last_name').isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    check('email').isEmail().withMessage('El correo electrónico no es válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]