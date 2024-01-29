import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../interfaces/interfaces";
import { hotelFacilities } from "../../constants/hotels.constants";

function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="mt-4">
      <h2 className="font-medium">Facilites: </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 lg:gap-2 mt-4">
        {hotelFacilities.map((val) => (
          <label>
            <input
              type="checkbox"
              value={val}
              className="mr-2"
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) return true;
                  else return "At least one facilities should be selected";
                },
              })}
            ></input>
            {val}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 font-semibold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}

export default FacilitiesSection;
