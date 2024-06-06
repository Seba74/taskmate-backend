import multer from 'multer'
import { v4 as uuid } from 'uuid'
import path from 'path'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images')
	},
	filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Solo se permiten imagenes'), '')
        }
        const name = uuid().split('-').splice(0, 2).join('')
		cb(null, name + ext)
	},
})

const upload = multer({storage})

export default upload
