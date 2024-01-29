import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../interfaces/interfaces";

function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    // heading
    <div className="flex gap-4 flex-col">
      <h1 className="text-2xl font-medium mb-4 text-center ">Add Hotel</h1>
      {/* name */}
      <div>
        <label htmlFor="name" className=" font-medium">
          Hotel Name
        </label>
        <input
          type="text"
          className="block border border-gray-400 w-full p-3 rounded mt-1"
          placeholder="Hotel Name"
          {...register("name", { required: "This field is required" })}
          autoComplete="true"
        />
        {errors.name && (
          <span className="text-red-500 font-semibold ">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* city and country */}
      <div className="flex flex-col lg:flex-row gap-2">
        {/* country */}
        <div className="w-full">
          <label htmlFor="contry" className=" font-medium">
            Country
          </label>
          <input
            type="text"
            className="block border border-gray-400 w-full p-3 rounded mt-1"
            placeholder="Country"
            {...register("country", { required: "This field is required" })}
            autoComplete="true"
          />
          {errors.country && (
            <span className="text-red-500 font-semibold ">
              {errors.country.message}
            </span>
          )}
        </div>

        {/* city */}
        <div className="w-full">
          <label htmlFor="city" className=" font-medium">
            City
          </label>
          <input
            type="text"
            className="block border border-gray-400 w-full p-3 rounded mt-1"
            placeholder="City"
            {...register("city", { required: "This field is required" })}
            autoComplete="true"
          />
          {errors.city && (
            <span className="text-red-500 font-semibold ">
              {errors.city.message}
            </span>
          )}
        </div>
      </div>
      {/* description */}
      <div>
        <label htmlFor="name" className=" font-medium">
          Description
        </label>
        <textarea
          rows={10}
          className="block border border-gray-400 w-full p-3 rounded mt-1"
          placeholder="write details about the hotel...."
          {...register("description", { required: "This field is required" })}
          autoComplete="true"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 font-semibold ">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* start rating */}
        <div className="w-full">
          <label htmlFor="star Rating" className=" font-medium">
            Star Rating
          </label>
          <select
            className="block border border-gray-400 px-4 py-2 rounded mt-1"
            {...register("starRating", {
              required: "This field is required",
              min: 1,
              max: 5,
            })}
            autoComplete="true"
          >
            <option value="" selected>
              Select Star Rating
            </option>
            {[1, 2, 3, 4, 5].map((val) => {
              return <option value={val}>{val}</option>;
            })}
          </select>
          {errors.starRating && (
            <span className="text-red-500 font-semibold ">
              {errors.starRating.message}
            </span>
          )}
        </div>

        {/* price per night */}
        <div className="w-full">
          <label htmlFor="Price per night" className=" font-medium">
            Price per night
          </label>
          <input
            type="number"
            min={5}
            className="block border border-gray-400 px-4 py-2 rounded mt-1"
            {...register("pricePerNight", {
              required: "This field is required",
              min: 5,
            })}
            autoComplete="true"
          />
          {errors.pricePerNight && (
            <span className="text-red-500 font-semibold ">
              {errors.pricePerNight.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsSection;
