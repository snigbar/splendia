import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useQuery } from "react-query";
import { fetchMyHotels } from "../utils/apiClient";
import moment from "moment";
import { useState } from "react";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import Loader from "../components/Loader";

export default function MyHotels() {
  const [readMore, setReadMore] = useState(true);
  const { showToast } = useAppContext();
  const { data: hotelData, isLoading } = useQuery(
    "fetchMyHotels",
    fetchMyHotels,
    {
      onError: (err: Error) => {
        showToast({
          message: err.message || "failed to fetch hotels",
          type: "error",
        });
      },
    }
  );

  return (
    <div className="container flex flex-col justify-between my-8 w-full lg:w-4/5 mx-auto gap-8">
      {/* heading */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">My Hotel</h1>
        <Link to="/add-hotel">
          <button className="px-6 py-2 bg-indigo-600 text-white inset-1 hover:bg-indigo-500 font-medium">
            Add Hotels
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-between items-center gap-5">
        {/* hotel data */}
        {isLoading ? (
          <Loader></Loader>
        ) : hotelData && hotelData.data.length > 0 ? (
          hotelData.data.map((hotel) => (
            <div className="bg-white rounded-lg shadow-lg px-6 py-8 space-y-4">
              {/* heading */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-medium">{hotel.name}</h1>
                  <p className="text-gray-600 text-sm">
                    {moment(hotel.createdAt).format("DD MMMM YYYY, hh:mma")}
                  </p>
                </div>
                <p className="font-semibold text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="orange"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 inline-block mb-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  {hotel.starRating} stars
                </p>
              </div>
              {/* description */}
              <p className="font-sm text-justify mt-1">
                {hotel.description.length < 250 ? (
                  hotel.description
                ) : readMore ? (
                  <>
                    {hotel.description.substring(0, 200)}
                    <span
                      className="text-indigo-600 cursor-pointer font-medium"
                      onClick={() => setReadMore(!readMore)}
                    >
                      ... Read more
                    </span>
                  </>
                ) : (
                  <>
                    {hotel.description}
                    <span
                      className="text-violet-700 cursor-pointer font-medium ml-2"
                      onClick={() => setReadMore(!readMore)}
                    >
                      Read less
                    </span>
                  </>
                )}
              </p>

              {/* details */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <div className="rounded-sm p-1 md:px-4 md:py-2 flex flex-col md:flex-row items-center justify-center w-full text-center text-sm font-medium">
                  <BsMap className="mr-1 text-indigo-700 w-6 h-6" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="rounded-sm p-1 md:px-4 md:py-2 flex flex-col md:flex-row items-center justify-center w-full text-center text-sm font-medium">
                  <BsBuilding className="mr-1 text-indigo-700 w-6 h-6" />
                  {hotel.type}
                </div>
                <div className="rounded-sm p-1 md:px-4 md:py-2 flex flex-col md:flex-row items-center justify-center w-full text-center text-sm font-medium">
                  <BiMoney className="mr-1 text-indigo-700 w-6 h-6" />£
                  {hotel.pricePerNight} per night
                </div>
                <div className="rounded-sm p-1 md:px-4 md:py-2 flex flex-col md:flex-row items-center justify-center w-full text-center text-sm font-medium">
                  <BiHotel className="mr-1 text-indigo-700 w-6 h-6" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="rounded-sm p-1 md:px-4 md:py-2 flex flex-col md:flex-row items-center justify-center w-full text-center text-sm font-medium">
                  <BiStar className="mr-1 text-indigo-700 w-6 h-6" />
                  {hotel.starRating} Star Rating
                </div>
              </div>

              {/* view details */}
              <span className="flex justify-end mt-2">
                <Link
                  to={`/my-hotels/edit-hotel/${hotel._id}`}
                  className="flex bg-indigo-600 text-white text-lg font-medium px-4 py-2 hover:bg-indigo-500"
                >
                  View Details
                </Link>
              </span>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-lg px-6 py-8 w-full">
            <h1 className="text-2xl font-medium text-center">
              You didn't added any hotel
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
