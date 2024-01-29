import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../interfaces/interfaces";

export default function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col lg:flex-row gap-2 mt-4">
      {/* country */}
      <div className="w-full">
        <label htmlFor="contry" className=" font-medium">
          Adults
        </label>
        <input
          type="Number"
          className="block border border-gray-400 w-full p-3 rounded mt-1"
          placeholder="Number of Adults"
          {...register("adultCount", { required: "This field is required" })}
          autoComplete="true"
        />
        {errors.adultCount && (
          <span className="text-red-500 font-semibold ">
            {errors.adultCount.message}
          </span>
        )}
      </div>

      {/* city */}
      <div className="w-full">
        <label htmlFor="contry" className=" font-medium">
          Children
        </label>
        <input
          type="Number"
          className="block border border-gray-400 w-full p-3 rounded mt-1"
          placeholder="Number of Adults"
          {...register("childCount", { required: "This field is required" })}
          autoComplete="true"
        />
        {errors.childCount && (
          <span className="text-red-500 font-semibold ">
            {errors.childCount.message}
          </span>
        )}
      </div>
    </div>
  );
}
