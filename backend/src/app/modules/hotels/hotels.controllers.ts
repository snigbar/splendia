import handleAsyncRequest from '../../utils/handleAsyncRequest'
import { Request, Response, Express } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { Buffer } from 'buffer'
import { HotelType } from './hotels.interface'
import HotelModel from './hotels.model'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETS,
})

export const createHotel = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const imageFiles = req.files as Express.Multer.File[]
    const hotel: HotelType = req.body
    // upload images to cloudinary
    const uploadPromises = imageFiles.map(async (img) => {
      const b64 = Buffer.from(img.buffer).toString('base64')
      const dataUri = `data:${img.mimetype};base64,${b64}`
      const response = await cloudinary.uploader.upload(dataUri)
      return response.url
    })

    const images = await Promise.all(uploadPromises)
    hotel.imageUrls = images
    hotel.lastUpdated = new Date()
    hotel.userId = req.userId

    const newHotel = new HotelModel(hotel)
    const result = await newHotel.save()
    res.status(201).json({
      message: 'created hotel sucessfully',
      data: result,
    })
  },
)
