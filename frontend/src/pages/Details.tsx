import { useParams } from "react-router-dom";
import { fetchHotelDetails } from "../utils/apiClient";
import { useQuery } from "react-query";
import Header from "../components/Header";
import { AiFillStar } from "react-icons/ai";
import Loader from "../components/Loader";
import { IoLocationSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";
import { GuestInForm } from "../forms/GuestInForm.tsx/GuestInForm";
import SearchBar from "../components/SearchBar";

export default function Details() {
  const { hotelId } = useParams();

  const { data: hotelData, isLoading } = useQuery(
    "fetchHotelDetails",
    async () => {
      return await fetchHotelDetails(hotelId as string);
    },
    { enabled: !!hotelId }
  );

  return (
    <div>
      <Header></Header>
      <SearchBar></SearchBar>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        hotelData?.data && (
          <div className="flex flex-col gap-6 py-12 px-4">
            {/* heading */}
            <div className=" flex items-end justify-between mb-6">
              <div className="sapace-y-2">
                <h1 className="text-3xl font-bold cursor-pointer">
                  {hotelData?.data?.name}
                </h1>
                <p className="flex items-center gap-1 font-semibold">
                  <IoLocationSharp className="text-slate-700" />{" "}
                  {hotelData?.data?.country}, {hotelData?.data?.city}
                </p>
              </div>
              <div className="space-y-2">
                <span className="flex">
                  {Array.from({ length: hotelData?.data?.starRating }).map(
                    () => (
                      <AiFillStar className="fill-yellow-400" />
                    )
                  )}
                </span>
                <span className="ml-1 font-medium italic">
                  {hotelData?.data?.type}
                </span>
              </div>
            </div>

            {/* slider image */}

            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper h-[250px] lg:h-[400px] w-full lg:w-3/4 mx-auto rounded-xl overflow-hidden"
            >
              {hotelData.data.imageUrls.map((img) => (
                <SwiperSlide>
                  <img
                    alt={hotelData.data.name}
                    src={img}
                    className="h-full w-full object-center object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* facilities */}
            <div className="flex gap-1 items-center flex-wrap">
              <span className="mr-2 font-medium">Facilities</span>
              {hotelData.data?.facilities.map((facility) => (
                <span className="bg-indigo-500 py-2 px-4 rounded-md font-bold text-white text-sm whitespace-nowrap">
                  {facility}
                </span>
              ))}
            </div>

            {/* description */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-start">
              {/* description */}
              <div className="whitespace-pre-line p-4 text-justify">
                {hotelData.data.description}
              </div>

              <GuestInForm
                hotelId={hotelData.data._id}
                pricePerNight={hotelData.data.pricePerNight}
              ></GuestInForm>
            </div>
          </div>
        )
      )}

      {/* end */}
    </div>
  );
}
