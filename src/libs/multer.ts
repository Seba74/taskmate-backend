import multer from 'multer'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { ErrorTM } from '../helpers/error.helper'
import { Request } from 'express'

const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
const allowedExtensions = [...allowedImageExtensions, '.pdf', '.doc', '.docx', '.xls', '.xlsx']

const storage = multer.memoryStorage()

export const uploadProject = multer({
	storage: storage,
	limits: { fileSize: 6 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase()
		if (!allowedImageExtensions.includes(ext)) {
			return cb(new ErrorTM('Error al cargar el archivo', 'Tipo de archivo no permitido'))
		}
		cb(null, true)
	},
})

export const uploadTask = multer({
	storage: storage,
	limits: { fileSize: 4 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase()
		if (!allowedExtensions.includes(ext)) {
			return cb(new ErrorTM('Error al cargar el archivo', 'Tipo de archivo no permitido'))
		}
		cb(null, true)
	},
})

export const saveFile = async (req: Request) => {
	const ext = path.extname(req.file.originalname).toLowerCase()
	if (allowedImageExtensions.includes(ext)) {
		return await optimizeImage(req.file.buffer, ext)
	}
	return saveDocument(req.file.buffer, ext)
}

const saveDocument = (fileBuffer: Buffer, ext: string) => {
	const fileName = uuid().split('-').splice(0, 2).join('')
	const outputFilename = fileName + ext

	const outputPath = path.join(process.cwd(), 'public', 'resources', 'documents', outputFilename)
	fs.writeFileSync(outputPath, fileBuffer)
	return outputFilename
}

export const convertToWebp = async (fileBuffer: Buffer) => {
	const fileName = uuid().split('-').splice(0, 2).join('')
	const outputFilename = fileName + '.webp'
	const outputPath = path.join(process.cwd(), 'public', 'images', outputFilename)

	await sharp(fileBuffer)
		.webp({ quality: 75, effort: 6 })
		.toFile(outputPath)
		.catch((err) => {
			throw new ErrorTM('Error al cargar la imagen', 'No se ha podido procesar la imagen')
		})
	return outputFilename
}

const optimizeImage = async (fileBuffer: Buffer, ext: string) => {
	const fileName = uuid().split('-').splice(0, 2).join('')
	const outputFilename = fileName + ext
	const outputPath = path.join(process.cwd(), 'public', 'resources', 'images', outputFilename)

	try {
		let image = sharp(fileBuffer)

		const { width, height, channels } = await image.metadata()

		if (width > 1920 || height > 1080) {
			image = image.resize(1920, 1080, {
				fit: 'inside',
				withoutEnlargement: true,
			})
		}

		if (ext === '.jpg' || ext === '.jpeg') {
			image = image.jpeg({ quality: 75, mozjpeg: true, chromaSubsampling: '4:2:0' })
		} else if (ext === '.png') {
			image = image.png({ compressionLevel: 9, palette: true, quality: 75 })
			if (channels === 4) {
				image = image.toColourspace('b-w')
			}
		} else if (ext === '.webp') {
			image = image.webp({ quality: 75, effort: 6 })
		}

		await image.toFile(outputPath)
	} catch (err) {
		throw new ErrorTM('Error al cargar la imagen', 'No se ha podido procesar la imagen')
	}

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
