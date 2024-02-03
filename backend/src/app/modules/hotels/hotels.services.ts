import HotelModel from './hotels.model'

export const findMyhotelsFromDB = async (userId: string) => {
  return await HotelModel.find({ userId })
}

export const findSingleHotel = async (id: string, userId: string) => {
  return await HotelModel.findOne({ _id: id, userId })
}
