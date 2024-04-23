import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

export const generateFBToken = (): string => {
	const accessKey = ''
	const payload = ''
	return jwt.sign({ data: payload }, accessKey, { expiresIn: '20y' })
}

export const generateAccessToken = (payload: any): string => {
	const accessKey = ''
	return jwt.sign(payload, accessKey, { expiresIn: '30d' })
}

export const validateToken = async (token: string) => {
	const accessKey = ''
	try {
		const decoded = jwt.verify(token, accessKey)
		if (typeof decoded === 'string') {
			throw new Error('Invalid token')
		}
		const payload = decoded
		const { iat, exp, ...data } = payload

		const accessToken = generateAccessToken(data as any)
		return {
			accessToken,
			payload,
		}
	} catch (error) {
		throw new Error(error)
	}
}
