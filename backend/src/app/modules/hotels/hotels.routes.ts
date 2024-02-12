import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import {
  createHotel,
  getHotelById,
  getHotels,
  getQueries,
  getSingleHotel,
  makeBooking,
  paymentIntent,
  updateHotel,
} from './hotels.controllers'
import verifyToken from '../../middlewares/auth'
import hotelValidationSchema from './hotels.validations'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
})

router.post(
  '/my-hotels',
  verifyToken,
  upload.array('imageFiles', 6),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await hotelValidationSchema.parseAsync(req.body)
    } catch (error) {
      next(error)
    }
    next()
  },
  createHotel,
)

router.get('/search', getQueries)
router.get('/hotel/:id', getHotelById)
// authorized routes
router.get('/my-hotels/:id', verifyToken, getSingleHotel)
router.put(
  '/my-hotels/:id',
  verifyToken,
  upload.array('imageFiles'),
  updateHotel,
)
router.get('/my-hotels', verifyToken, getHotels)
// payment intent
router.post('/:hotelId/booking/payment-intent', verifyToken, paymentIntent)
router.post('/:hotelId/booking', verifyToken, makeBooking)

const hotelRoutes = router
export default hotelRoutes
