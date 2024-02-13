import { useQuery } from "react-query";
import { fetchLatest } from "../utils/apiClient";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const LatestHotels = () => {
  const { data: hotels } = useQuery("fetchLatestHotel", fetchLatest);
  return (
    <div className="my-8 py-8 w-11/12 lg:w-4/5 space-y-12 mx-auto">
      <h1 className="md:text-4xl font-semibold text-2xl text-center my-4">
        Latest Hotels
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {hotels?.slice(0, 4).map((hotel, idx) => (
          <div
            className={`space-y-4 bg-white rounded-md shadow-lg w-full ${
              idx === 3 ? "lg:hidden 2xl:block" : ""
            }`}
            key={hotel._id}
          >
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper w-full"
            >
              {hotel.imageUrls?.map((url) => (
                <SwiperSlide>
                  <img
                    src={url}
                    className="w-full h-80 lg:h-72  object-cover rounded-t-md mb-2"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* hotel details */}

            <div className="w-full flex justify-between items-center gap-4 flex-col">
              <h1 className="text-center font-medium text-xl">{hotel.name}</h1>
              <p className="flex justify-center items-center gap-1 font-semibold">
                <IoLocationSharp className="text-slate-700" /> {hotel?.country},{" "}
                {hotel?.city}
              </p>

              <div className="flex gap-1 justify-center items-center flex-wrap">
                {hotel.facilities.slice(0, 3).map((facility) => (
                  <span className="text-indigo-500 py-1 px-3 rounded-md font-bold text-sm lg:text-sm whitespace-nowrap">
                    {facility}
                  </span>
                ))}
                <span className="text-sm">
                  {hotel.facilities.length > 3 &&
                    `+${hotel.facilities.length - 3} more`}
                </span>
              </div>

              <div className="w-full flex justify-center my-4">
                <Link
                  to={`/detail/${hotel._id}`}
                  className="bg-indigo-600 text-white text-sm lg:text-base h-full px-4 py-2 rounded-full font-semibold max-w-fit hover:bg-indigo-500 mx-auto"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestHotels;
