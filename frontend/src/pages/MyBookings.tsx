import { useQuery } from "react-query";
import { fetchMyBookings } from "../utils/apiClient";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function MyBookings() {
  const { data: hotels } = useQuery("myBookings", fetchMyBookings);

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-2xl font-semibold">My Bookings</h1>
      <div className="w-11/12 md:w-4/5 mx-auto p-2 flex flex-col items-center justify-between gap-4 my-8 ">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div className="bg-white shadow-md grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center w-full">
              {/* image */}
              <div className="w-full">
                <img
                  src={hotel.imageUrls[0]}
                  className="h-[320px] w-full md:w-11/12 object-cover"
                />
              </div>
              {/* details */}
              <div className="p-4 flex flex-col justify-between items-start gap-4">
                {/* heading */}
                <div className=" flex items-end justify-between mb-6 w-full">
                  <div className="sapace-y-2">
                    <Link
                      to={`/detail/${hotel._id}`}
                      className="text-2xl font-bold cursor-pointer"
                    >
                      {hotel.name}
                    </Link>
                    <p className="flex items-center gap-1 font-semibold">
                      <IoLocationSharp className="text-slate-700" />{" "}
                      {hotel.country}, {hotel.city}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="flex">
                      {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className="fill-yellow-400" />
                      ))}
                    </span>
                    <span className="ml-1 font-medium italic">
                      {hotel.type}
                    </span>
                  </div>
                </div>

                {/* booking dates */}

                {hotel.bookings.map((booking) => (
                  <div>
                    <div>
                      <span className="font-bold mr-2">Dates: </span>
                      <span>
                        {new Date(booking.checkIn).toDateString()} -{" "}
                        {new Date(booking.checkOut).toDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold mr-2">Guests:</span>
                      <span>
                        {booking.adultCount} adults, {booking.childCount}{" "}
                        children
                      </span>
                    </div>
                  </div>
                ))}

                <Link
                  to={`/detail/${hotel._id}`}
                  className="bg-indigo-600 text-white h-full px-3 py-2 font-semibold max-w-fit hover:bg-indigo-500"
                >
                  View Hotel
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center w-full flex flex-col justify-between items-center gap-6">
            <h1 className="text-xl font-semibold">
              You have not booked any hotel
            </h1>
            <Link
              to={`/search`}
              className="bg-indigo-600 text-white px-3 py-2 font-semibold hover:bg-indigo-500"
            >
              Find Hotels
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
