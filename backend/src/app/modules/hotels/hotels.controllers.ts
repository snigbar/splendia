import handleAsyncRequest from '../../utils/handleAsyncRequest'
import { Request, Response, Express } from 'express'
import { HotelType } from './hotels.interface'
import HotelModel from './hotels.model'
import { findMyhotelsFromDB, findSingleHotel } from './hotels.services'
import uploadImages from '../../utils/uploadImges'

export const createHotel = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const imageFiles = req.files as Express.Multer.File[]
    const hotel: HotelType = req.body

    // upload images to cloudinary
    const images = await uploadImages(imageFiles)
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

export const getHotels = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const userId = req.userId
    const result = await findMyhotelsFromDB(userId)
    res
      .status(201)
      .json({ message: 'hotels retrived successful', data: result })
  },
)

export const getSingleHotel = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const userId = req.userId
    const { id } = req.params
    const result = await findSingleHotel(id, userId)
    if (!result) {
      throw new Error("didn't find any hotel by use")
    }
    res.status(201).json({ message: 'hotel retrived successful', data: result })
  },
)

export const updateHotel = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const userId = req.userId
    const { id } = req.params
    const updatedData: HotelType = req.body
    updatedData.lastUpdated = new Date()
    const result = await HotelModel.findOneAndUpdate(
      { _id: id, userId },
      updatedData,
      { new: true },
    )
    if (!result) {
      throw new Error("didn't find any hotel")
    }

    const imgfiles = req.files as Express.Multer.File[]
    const images = await uploadImages(imgfiles)

    result.imageUrls = [...images, ...(result.imageUrls || [])]

    await result.save()

    res.status(201).json({ message: 'hotel retrived successful', data: result })
  },
)
