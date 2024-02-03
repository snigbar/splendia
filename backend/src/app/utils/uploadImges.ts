import { Express } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { Buffer } from 'buffer'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETS,
})
const uploadImages = async (imgFiles: Express.Multer.File[]) => {
  const uploadPromises = imgFiles.map(async (img) => {
    const b64 = Buffer.from(img.buffer).toString('base64')
    const dataUri = `data:${img.mimetype};base64,${b64}`
    const response = await cloudinary.uploader.upload(dataUri)
    return response.url
  })

  return await Promise.all(uploadPromises)
}

export default uploadImages
