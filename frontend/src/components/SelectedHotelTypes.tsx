import React from "react";
import { hotelTypes } from "../constants/hotels.constants";

type Props = {
  selectedHotels: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function SelectedHotelTypes({
  selectedHotels,
  onChange,
}: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="font-medium my-1">Hotel Types:</h4>
      {hotelTypes.map((hotel) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotel}
            checked={selectedHotels.includes(hotel)}
            onChange={onChange}
          />
          <span>{hotel}</span>
        </label>
      ))}
    </div>
  );
}
