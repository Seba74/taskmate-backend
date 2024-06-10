import multer from 'multer'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { ErrorTM } from '../helpers/error.helper'
import { Request } from 'express'

const storage = multer.memoryStorage()

export const uploadProject = multer({
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp') {
			return cb(new ErrorTM('Error al cargar la imagen', 'Solo se permiten imágenes'))
		}
		cb(null, true)
	},
})

export const uploadTask = multer({
	storage: storage,
	limits: { fileSize: 4 * 1024 * 1024 },
})

export const saveFile = (req: Request) => {
	const ext = path.extname(req.file.originalname)
	if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
		return convertToWebp(req.file.buffer, 'images')
	}
	return saveDocument(req.file.buffer, ext)
}

export const removeImage = (filename: string) => {
	const filePath = path.join(process.cwd(), 'public', 'images', filename)
	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Failed to delete image:', err)
		}
	})
}

const saveDocument = (fileBuffer: Buffer, ext: string) => {
	const fileName = uuid().split('-').splice(0, 2).join('')
	const outputFilename = fileName + ext

	const outputPath = path.join(process.cwd(), 'public', 'resources', 'documents', outputFilename)
	fs.writeFileSync(outputPath, fileBuffer)
	return outputFilename
}

export const convertToWebp = async (fileBuffer: Buffer, lock?: string) => {
	const fileName = uuid().split('-').splice(0, 2).join('')
	const outputFilename = fileName + '.webp'
	let outputPath = ''
	if (lock) {
		outputPath = path.join(process.cwd(), 'public', 'resources', 'images', outputFilename)
	} else {
		outputPath = path.join(process.cwd(), 'public', 'images', outputFilename)
	}
	
	await sharp(fileBuffer).webp().toFile(outputPath).catch((err) => {
		throw new ErrorTM('Error al cargar la imagen', 'No se ha podido procesar la imagen')
	})
	return outputFilename
}
