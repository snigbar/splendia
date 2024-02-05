import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import { TSearchParams } from "../interfaces/interfaces";
import { searchHotels } from "../utils/apiClient";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchResultCards from "../components/SearchResultCards";

function Search() {
  const searchContext = useSearchContext();
  const queryParams: TSearchParams = {
    destination: searchContext.destination,
    checkIn: searchContext.checkIn.toString(),
    checkOut: searchContext.checkOut.toString(),
    adultCount: searchContext.adultCount,
    childCount: searchContext.childCount,
  };
  const { data: hotelData } = useQuery(["searchHotels", queryParams], () =>
    searchHotels(queryParams)
  );
  return (
    <div>
      <Header></Header>
      <SearchBar></SearchBar>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="p-5 h-fit stricky rounded-lg border border-slate-300 top-10">
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
    </div>
  );
}

export default Search;
