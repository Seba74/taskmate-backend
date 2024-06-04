import { generateAccessToken } from '../config/jwt'
import { Auth, AuthRegister, Payload } from '../interfaces/auth.dto'
import * as bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { ErrorTM } from '../helpers/error.helper'

const prisma = new PrismaClient()

export class AuthService {
	login = async (authData: Auth) => {
		try {
			const user = await prisma.user.findUnique({ where: { email: authData.email } })

			if (!user) throw new Error('Usuario o contraseña incorrectos')
			console.log(user)
			const match = await bcrypt.compare(authData.password, user.password)

			if (!match) {
				throw new Error('Usuario o contraseña incorrectos')
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
			throw new ErrorTM('Error al iniciar sesión', error.message)
		}
	}

	register = async (authData: AuthRegister) => {
		try {
			const user = await prisma.user.findUnique({ where: { email: authData.email } })

			if (user) throw new Error('El correo ya está registrado')
			const password = await bcrypt.hash(authData.password, 10)

			const newUser = await prisma.user.create({
				data: {
					name: authData.name,
					last_name: authData.last_name,
					email: authData.email,
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
			throw new ErrorTM('Error al intentar Registrar', error.message)
		}
	}

	checkToken = async (payload: any) => {
		try {
			const { iat, exp, ...data } = payload
			const user = await prisma.user.findUnique({ where: { id: data.id } })
			if (!user) throw new Error('Invalid token')
			return generateAccessToken(data as Payload)
		} catch (error) {
			throw new ErrorTM('Error al mantener la sesión', error.message)
		}
	}
}
