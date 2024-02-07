// eslint-disable-next-line @typescript-eslint/no-explicit-any
const constructQuery = (queryParams: any) => {
  const queryObj: Record<string, unknown> = {}

  if (queryParams.destination) {
    queryObj.$or = [
      { city: new RegExp(queryParams.destination, 'i') },
      { country: new RegExp(queryParams.destination, 'i') },
    ]
  }

  if (queryParams.adultCount) {
    queryObj.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    }
  }

  if (queryParams.childCount) {
    queryObj.childCount = {
      $gte: parseInt(queryParams.childCount),
    }
  }

  if (queryParams.facilities) {
    queryObj.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    }
  }

  if (queryParams.types) {
    queryObj.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    }
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : [parseInt(queryParams.stars)]

    queryObj.starRating = { $in: starRatings }
  }

  if (queryParams.maxPrice) {
    queryObj.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    }
  }

  return queryObj
}

export default constructQuery
