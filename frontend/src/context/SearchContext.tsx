import { createContext, useContext, useState } from "react";
import { TChildren, TSearchContext } from "../interfaces/interfaces";

const searchContext = createContext<TSearchContext | undefined>(undefined);

export default function SearchContext({ children }: TChildren) {
  const checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + 1);

  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<Date>(
    new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    new Date(sessionStorage.getItem("checkOut") || checkOutDate.toISOString())
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("hotelId") || ""
  );

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

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("HotelId", hotelId || "");
  };

  const saveDestination = (destination: string) => {
    setDestination(destination);
    sessionStorage.setItem("destination", destination);
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
        saveDestination,
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
