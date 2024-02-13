import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../constants/hotels.constants";
import { HotelFormData } from "../../interfaces/interfaces";
import cn from "../../lib/cn";

export default function TypeSection() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div className="mt-4">
      <h2 className="font-medium">Hotel Type: </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1 lg:gap-2 mt-4">
        {hotelTypes.map((type) => (
          <label
            className={cn(
              "cursor-pointer text-center text-xs md:text-sm rounded-full p-1 lg:px-4 lg:py-2 font-semibold bg-gray-100 hover:bg-indigo-500 hover:text-white",
              { "bg-indigo-600 text-white": typeWatch === type }
            )}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "Select a field",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 font-semibold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}
