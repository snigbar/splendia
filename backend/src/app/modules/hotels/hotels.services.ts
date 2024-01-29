import { HotelType } from './hotels.interface'
import HotelModel from './hotels.model'

export const createHotelInDB = async (hotel: HotelType) => {
  const result = await HotelModel.create(hotel, { new: true })
  return result
}
