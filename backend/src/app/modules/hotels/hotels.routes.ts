import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import {
  createHotel,
  getHotels,
  getSingleHotel,
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

router.get('/my-hotels', verifyToken, getHotels)
router.get('/my-hotels/:id', verifyToken, getSingleHotel)
router.put(
  '/my-hotels/:id',
  verifyToken,
  upload.array('imageFiles'),
  updateHotel,
)
const hotelRoutes = router
export default hotelRoutes
