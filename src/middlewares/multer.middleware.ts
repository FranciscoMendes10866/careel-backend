import multer from '@koa/multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

import cloudinaryConfig from '@configs/cloudinary.config'

const storage = new CloudinaryStorage({
	cloudinary: cloudinaryConfig,
	params: {
		folder: process.env.CLOUD_FOLDER
	}
})

const parser = multer({ storage: storage })

export default parser
