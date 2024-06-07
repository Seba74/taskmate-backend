import multer from 'multer'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { ErrorTM } from '../helpers/error.helper'
import { Request } from 'express'

const storage = multer.memoryStorage()

export const upload = multer({
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
			return cb(new ErrorTM('Error al cargar la imagen', 'Solo se permiten imágenes'))
		}
		cb(null, true)
	},
})

export const convertToWebp = async (fileBuffer: Buffer, filename: string) => {
	const outputFilename = filename + '.webp'
	const outputPath = path.join(process.cwd(), 'public', 'images', outputFilename)
	await sharp(fileBuffer).webp().toFile(outputPath)
	return outputFilename
}

export const removeImage = (filename: string) => {
	const filePath = path.join(process.cwd(), 'public', 'images', filename)
	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Failed to delete image:', err)
		}
	})
}

export const getRandomFileName = async (req: Request) => {
	const fileName = uuid().split('-').splice(0, 2).join('')
	const webpFileName = await convertToWebp(req.file.buffer, fileName)
	return webpFileName
}
