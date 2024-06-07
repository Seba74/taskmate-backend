import multer from 'multer'
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import { ErrorTM } from '../helpers/error.helper'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images')
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
			return cb(new ErrorTM('Error al cargar la imagen', 'Solo se permiten imagenes'), '')
		}
		const name = uuid().split('-').splice(0, 2).join('')
		cb(null, name + ext)
	},
})

export const removeImage = (filename: string) => {
	const filePath = path.join(process.cwd(), 'public', 'images', filename)
	console.log('Removing image:', filePath)
	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Failed to delete image:', err)
		}
	})
}

export const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 },
})
