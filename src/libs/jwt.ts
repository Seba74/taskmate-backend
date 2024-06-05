import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()
const accessKey = process.env.SEED_JWT

export const generateAccessToken = (payload: any): string => {
	try {
		return jwt.sign(payload, accessKey, { expiresIn: '30d' })
	} catch (error) {
		throw new Error(error)
	}
}

export const validateToken = async (token: string) => {
	try {
		const decoded = jwt.verify(token, accessKey)
		if (typeof decoded === 'string') throw new Error('Invalid token')

		const payload = decoded
		const { iat, exp, ...data } = payload

		const accessToken = generateAccessToken(data as any)
		return { accessToken, payload }
	} catch (error) {
		throw new Error(error)
	}
}
