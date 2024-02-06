import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import { TSearchParams } from "../interfaces/interfaces";
import { searchHotels } from "../utils/apiClient";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResultCards from "../components/SearchResultCards";
import { useState } from "react";
import Pagination from "../components/Pagination";

function Search() {
  const searchContext = useSearchContext();

  const [page, setPage] = useState<number>(1);

  const queryParams: TSearchParams = {
    destination: searchContext.destination,
    checkIn: searchContext.checkIn.toString(),
    checkOut: searchContext.checkOut.toString(),
    adultCount: searchContext.adultCount,
    childCount: searchContext.childCount,
    page: page.toString(),
  };
  const { data: hotelData } = useQuery(["searchHotels", queryParams], () =>
    searchHotels(queryParams)
  );
  return (
    <div>
      <Header></Header>
      <SearchBar></SearchBar>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="p-5 h-fit sticky rounded-lg border border-slate-300 top-10">
          filter:
        </div>

        <div className="flex flex-col items-center gap-5">
          <span className="text-xl font-bold self-start">
            {hotelData?.pagination.total} Hotels found
            {searchContext.destination
              ? ` in ${searchContext.destination}`
              : ""}
          </span>

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
