import handleAsyncRequest from '../../utils/handleAsyncRequest'
import { Request, Response, Express } from 'express'
import { HotelType } from './hotels.interface'
import HotelModel from './hotels.model'
import { findMyhotelsFromDB, findSingleHotel } from './hotels.services'
import uploadImages, { deleteImgsFromCloudinary } from '../../utils/uploadImges'

// create hotel
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

// get hotels

export const getHotels = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const userId = req.userId
    const result = await findMyhotelsFromDB(userId)
    res
      .status(201)
      .json({ message: 'hotels retrived successful', data: result })
  },
)

// get singleHotel
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

// update hotel
export const updateHotel = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const userId = req.userId
    const { id } = req.params
    const updatedData: HotelType = req.body
    const findHotel = await HotelModel.findOne({ _id: id, userId })

    if (!findHotel) {
      throw new Error("didn't find any hotel")
    }

    // create an array of public id of the images
    const deleteImgs =
      updatedData?.imageUrls?.length > 0 &&
      findHotel?.imageUrls
        ?.filter((url) => !updatedData.imageUrls.includes(url))
        ?.map((url) => {
          const match = url.match(/\/([^/]+)\.jpg/)
          return match ? match[1] : null
        })

    // delete images from cloudinary
    if (deleteImgs && deleteImgs?.length > 0) {
      await deleteImgsFromCloudinary(deleteImgs as string[])
    }
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

    result.imageUrls = [...images, ...(updatedData.imageUrls || [])]
    await result.save()

    res.status(201).json({ message: 'hotel retrived successful', data: result })
  },
)

// queries api
export const getQueries = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const pageSize = 5
    const page = parseInt(req.query?.page ? req.query.page.toString() : '1')
    const skip = (page - 1) * pageSize

    const hotels = await HotelModel.find().skip(skip).limit(pageSize)

    if (!hotels) {
      throw new Error('no hotel found')
    }
    const documentCount = await HotelModel.countDocuments()

    res.status(201).json({
      message: 'hotel retrived successful',
      data: hotels,
      pagination: {
        total: documentCount,
        page,
        pages: Math.ceil(documentCount / pageSize),
      },
    })
  },
)
