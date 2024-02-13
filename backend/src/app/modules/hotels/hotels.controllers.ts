import handleAsyncRequest from '../../utils/handleAsyncRequest'
import { Request, Response, Express } from 'express'
import { BookingType, HotelType } from './hotels.interface'
import HotelModel from './hotels.model'
import { findMyhotelsFromDB, findSingleHotel } from './hotels.services'
import uploadImages, { deleteImgsFromCloudinary } from '../../utils/uploadImges'
import constructQuery from '../../utils/queryConstructor'
import Stripe from 'stripe'
import config from '../../config/config'

const stripe = new Stripe(config.stripe_api_secret as string)

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

// get latest hotels
export const getLatest = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const result = await HotelModel.find().sort('-createdAt')
    if (!result) {
      throw new Error("didn't find any hotel by use")
    }
    res.status(201).json({ message: 'latest hotels retrived', data: result })
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
    const query = constructQuery(req.query)
    const pageSize = 5
    const page = parseInt(req.query?.page ? req.query.page.toString() : '1')
    const skip = (page - 1) * pageSize

    let sortOptions = {}
    switch (req.query.sortOption) {
      case 'starRating':
        sortOptions = { starRating: -1 }
        break
      case 'pricePerNightAsc':
        sortOptions = { pricePerNight: 1 }
        break
      case 'pricePerNightDesc':
        sortOptions = { pricePerNight: -1 }
        break
    }

    const hotels = await HotelModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)

    if (!hotels) {
      throw new Error('no hotel found')
    }
    const documentCount = await HotelModel.countDocuments(query)

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

// hotel destials
export const getHotelById = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const id = req.params.id.toString()
    if (!id) throw new Error('hotel id is required')

    const hotel = await HotelModel.findById(id)
    if (!hotel) throw new Error('no hotel found')

    res.status(201).json({
      message: 'Hotel data retrived',
      data: hotel,
    })
  },
)

// payment intent
export const paymentIntent = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const { hotelId } = req.params
    const { numberOfNight } = req.body

    const hotel = await HotelModel.findById(hotelId).select('pricePerNight')

    if (!hotel) throw new Error('No hotel found')

    const totalCost = Number(hotel.pricePerNight) * Number(numberOfNight)

    const intent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: 'usd',
      metadata: {
        userId: req.userId,
        hotelId,
      },
    })

    if (!intent.client_secret) {
      throw new Error('Failed to create payment intent')
    }

    res.status(201).json({
      clientSecret: (intent.client_secret as string).toString(),
      paymentId: intent.id,
      totalCost,
    })
  },
)

export const makeBooking = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const { hotelId } = req.params
    const { paymentIntentId } = req.body

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (!intent) {
      throw new Error('No payment intent found')
    }

    if (
      intent.metadata.hotelId !== hotelId ||
      intent.metadata.userId !== req.userId
    ) {
      throw new Error('mismatching payment info')
    }

    if (intent.status !== 'succeeded') {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${intent.status}`,
      })
    }
    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    }

    const hotel = await HotelModel.findOneAndUpdate(
      { _id: hotelId },
      { $push: { bookings: newBooking } },
    )

    if (!hotel) {
      throw new Error('Failed to pay. Hotel not found')
    }

    await hotel.save()
    res.status(200).json({
      message: 'Booking Successfull',
      data: {},
    })
  },
)

// get my bookings

export const getMyBookings = handleAsyncRequest(
  async (req: Request, res: Response) => {
    const userId = req.userId
    const hotel = await HotelModel.aggregate([
      { $match: { bookings: { $elemMatch: { userId: { $eq: userId } } } } },
    ])

    if (!hotel) throw new Error('no bookings found')

    const bookingOfUser = hotel.map((hotel) => {
      const usersBooking = hotel.bookings.filter(
        (book: BookingType) => book.userId === userId,
      )
      return {
        ...hotel,
        bookings: usersBooking,
      }
    })

    res.status(201).json({
      message: 'Booking Data Retrived',
      data: bookingOfUser,
    })
  },
)
