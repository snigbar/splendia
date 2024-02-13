import { AiFillStar } from "react-icons/ai";
import { HotelsResponseType } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

export default function SearchResultCards({
  hotel,
}: {
  hotel: HotelsResponseType;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] bg-white shadow-md rounded-lg p-4 gap-8">
      {/* image */}
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* text details */}

      <div className="grid grid-rows-[2fr_3fr_2fr] p-1 gap-2">
        {/* heading and start */}
        <div className="space-y-2">
          <div className="flex items-center justify-end">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm font-medium">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>

          <p className="font-medium text-sm my-1 italic">
            Maximum Adult: {hotel.adultCount}, Maximum Child: {hotel.childCount}
          </p>
        </div>

        {/* hotel descript tion */}
        <div className="line-clamp-5 text-justify font-sm lg:text-base">
          {hotel.description}
        </div>

        {/* facilities */}
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          {/* facilitis */}
          <div className="flex gap-1 items-center flex-wrap">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-indigo-500 py-1 px-3 rounded-md font-bold text-white text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          {/* view details */}
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold">
              £{hotel.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-indigo-600 text-white h-full px-3 py-2 font-semibold max-w-fit hover:bg-indigo-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
