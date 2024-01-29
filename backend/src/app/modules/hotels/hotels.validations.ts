import { z } from 'zod'

const bookingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  adultCount: z.coerce.number(),
  childCount: z.coerce.number(),
  checkIn: z.date(),
  checkOut: z.date(),
  userId: z.string(),
  totalCost: z.coerce.number(),
})

const hotelValidationSchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  city: z.string(),
  country: z.string(),
  description: z.string(),
  type: z.string(),
  adultCount: z.coerce.number(),
  childCount: z.coerce.number(),
  facilities: z.array(z.string()),
  pricePerNight: z.coerce.number(),
  starRating: z.coerce.number().int().min(1).max(5),
  bookings: z.array(bookingSchema).optional(),
})

export default hotelValidationSchema
