import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import { TSearchParams } from "../interfaces/interfaces";
import { searchHotels } from "../utils/apiClient";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResultCards from "../components/SearchResultCards";
import { useState } from "react";
import Pagination from "../components/Pagination";
import SelectedStars from "../components/SelectedStars";
import SelectedHotelTypes from "../components/SelectedHotelTypes";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilters";

function Search() {
  const searchContext = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotels, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const queryParams: TSearchParams = {
    destination: searchContext.destination,
    checkIn: searchContext.checkIn.toString(),
    checkOut: searchContext.checkOut.toString(),
    adultCount: searchContext.adultCount,
    childCount: searchContext.childCount,
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotels,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  // handle starts
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
    setPage(1);
  };

  // handle Selected Hotel type
  const handleHotelType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prev) =>
      event.target.checked
        ? [...prev, hotelType]
        : prev.filter((type) => type !== hotelType)
    );
    setPage(1);
  };

  // handle change facilities type
  const handleHotelFacilities = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facilitiesType = event.target.value;

    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facilitiesType]
        : prev.filter((type) => type !== facilitiesType)
    );
    setPage(1);
  };

  const { data: hotelData } = useQuery(["searchHotels", queryParams], () => {
    return searchHotels(queryParams);
  });

  return (
    <div>
      <Header></Header>
      <SearchBar></SearchBar>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="p-5 sticky h-fit rounded-lg border top-10 bg-white shadow-md">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>
            {/* stars */}
            <SelectedStars
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />

            {/* hotel type */}
            <SelectedHotelTypes
              selectedHotels={selectedHotels}
              onChange={handleHotelType}
            />

            {/* hotel facilities */}
            <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleHotelFacilities}
            ></FacilitiesFilter>

            {/* price filter */}
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={setSelectedPrice}
              setPage={setPage}
            ></PriceFilter>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-xl font-bold self-start">
            {hotelData?.pagination.total} Hotels found
            {searchContext.destination
              ? ` in ${searchContext.destination}`
              : ""}
          </span>
          <p className="text-slate-600 text-sm self-start">
            Showing {hotelData?.data.length} of {hotelData?.pagination.total}
          </p>
          {/* sort option */}
          <select
            className="self-end p-2 shadow-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">SortBy</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (Low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (High to low)
            </option>
          </select>

          {/* search result cards */}
          {hotelData?.data.map((data) => (
            <SearchResultCards hotel={data} key={data._id}></SearchResultCards>
          ))}
        </div>
      </div>

      <div className="my-4">
        <Pagination
          pages={hotelData?.pagination.pages || 1}
          page={hotelData?.pagination.page || 1}
          onPageChange={(number) => {
            setPage(number);
          }}
        ></Pagination>
      </div>
    </div>
  );
}

export default Search;
