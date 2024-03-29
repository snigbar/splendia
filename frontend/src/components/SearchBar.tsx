import { FormEvent, useRef, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore, MdSearch } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const searchContext = useSearchContext();
  const navigate = useNavigate();
  const checkOutDate = new Date();
  const formRef = useRef<HTMLFormElement>(null);
  checkOutDate.setDate(checkOutDate.getDate() + 1);

  const [destination, setDestination] = useState<string>(
    searchContext.destination
  );
  const [checkIn, setCheckIn] = useState<Date>(searchContext.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(searchContext.checkOut);
  const [adultCount, setAdultCount] = useState<number>(
    searchContext.adultCount
  );
  const [childCount, setChildCount] = useState<number>(
    searchContext.childCount
  );

  const handleClear = () => {
    searchContext.saveSearchValue("", new Date(), checkOutDate, 1, 0);
    formRef.current?.reset();
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(checkOutDate);
    setAdultCount(1);
    setChildCount(0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchContext.saveSearchValue(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const minCheckoutDate = new Date();
  minCheckoutDate.setDate(checkIn.getDate() + 1);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="-mt-12 px-5 py-3 lg:px-10 xl:px-5 rounded-sm lg:rounded-full shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-center content-center gap-2 lg:gap-1 bg-white mx-auto w-11/12"
    >
      <div className="flex flex-row items-center flex-1 bg-white">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none border border-slate-300 rounded-full px-3 py-2"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full px-3 py-2 focus:outline-none font-bold border border-slate-300 text-center ms-1"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full px-3 py-2 focus:outline-none font-bold border border-slate-300 text-center ms-1"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(Number(event.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none border border-slate-300"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={minCheckoutDate}
          endDate={checkOut}
          minDate={minCheckoutDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 focus:outline-none border border-slate-300"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex items-center gap-1">
        <button className=" bg-indigo-600 text-white h-full p-2 font-bold hover:bg-indigo-500 w-full">
          <MdSearch className="inline text-xl"></MdSearch> Search
        </button>

        <button
          type="reset"
          className="bg-rose-600 text-white h-full p-2 font-bold hover:bg-rose-500 w-full lg:rounded-e-full"
          onClick={() => handleClear()}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
