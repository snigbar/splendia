import React from "react";
import { hotelFacilities } from "../constants/hotels.constants";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function FacilitiesFilter({
  selectedFacilities,
  onChange,
}: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="font-medium my-1">Hotel Facilities:</h4>
      {hotelFacilities.map((hotel) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotel}
            checked={selectedFacilities.includes(hotel)}
            onChange={onChange}
          />
          <span>{hotel}</span>
        </label>
      ))}
    </div>
  );
}
