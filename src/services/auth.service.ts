import { generateAccessToken } from '../libs/jwt'
import { Auth, AuthRegister, Payload } from '../interfaces/auth.dto'
import * as bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { ErrorMessage, ErrorTM } from '../helpers/error.helper'

const prisma = new PrismaClient()

export class AuthService {
	login = async (authData: Auth) => {
		try {
			const user = await prisma.user.findUnique({ where: { email: authData.email } })

			if (!user) throw new ErrorMessage('Usuario o contraseña incorrectos')
			const match = await bcrypt.compare(authData.password, user.password)

			if (!match) {
				throw new ErrorMessage('Usuario o contraseña incorrectos')
			}

			const payload: Payload = {
				id: user.id,
				name: user.name,
				last_name: user.last_name,
				email: user.email,
			}
			const token = generateAccessToken(payload)

			return {
				token,
				user: {
					id: user.id,
					name: user.name,
					last_name: user.last_name,
					email: user.email,
				},
			}
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al iniciar sesión', error.message)
			}

			throw new ErrorTM(
				'Error al iniciar sesión',
				'No fue posible iniciar sesión, intente nuevamente.',
			)
		}
	}

	register = async (authData: AuthRegister) => {
		try {
			const user = await prisma.user.findUnique({ where: { email: authData.email } })

			if (user) throw new ErrorMessage('El correo ya está registrado')
			const password = await bcrypt.hash(authData.password, 10)
			if (!authData.profile_picture) authData.profile_picture = ''

			const newUser = await prisma.user.create({
				data: {
					name: authData.name,
					last_name: authData.last_name,
					email: authData.email,
					profile_picture: authData.profile_picture,
					password,
				},
			})

			const payload: Payload = {
				id: newUser.id,
				name: newUser.name,
				last_name: newUser.last_name,
				email: newUser.email,
			}
			const token = generateAccessToken(payload)

			return {
				token,
				user: {
					id: newUser.id,
					name: newUser.name,
					last_name: newUser.last_name,
					email: newUser.email,
				},
			}
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al intentar Registrar', error.message)
			}

			throw new ErrorTM(
				'Error al intentar Registrar',
				'No fue posible registrar el usuario, intente nuevamente.',
			)
		}
	}

	checkToken = async (payload: any) => {
		try {
			const { iat, exp, ...data } = payload
			const user = await prisma.user.findUnique({ where: { id: data.id } })
			if (!user) throw new ErrorMessage('El Token no es valido')
			const newToken = generateAccessToken(data as Payload)
			return { token: newToken, user }
		} catch (error) {
			if (error instanceof ErrorMessage) {
				throw new ErrorTM('Error al validar token', error.message)
			}

			throw new ErrorTM(
				'Error al validar token',
				'No fue posible validar el token, intente nuevamente.',
			)
		}
	}
}
