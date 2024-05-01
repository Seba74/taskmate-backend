import { check } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validate } from '../helpers/validator.helper'

export const createProjectsValidator = [
    check('name')
        .exists().withMessage('Se requiere un nombre de proyecto')
        .isLength({ min: 3 }).withMessage('El nombre del proyecto debe tener al menos 3 caracteres'),
    check('description')
        .exists().withMessage('Se requiere una descripción del proyecto')
        .isLength({ min: 3 }).withMessage('La descripción del proyecto debe tener al menos 3 caracteres'),
    (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
]
