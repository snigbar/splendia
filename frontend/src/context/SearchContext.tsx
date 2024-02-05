import { createContext, useContext, useState } from "react";
import { TChildren, TSearchContext } from "../interfaces/interfaces";

const searchContext = createContext<TSearchContext | undefined>(undefined);

export default function SearchContext({ children }: TChildren) {
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");

  const saveSearchValue = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) setHotelId(hotelId);
  };

  return (
    <searchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValue,
      }}
    >
      {children}
    </searchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
  const context = useContext(searchContext);
  return context as TSearchContext;
};
