import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../interfaces/interfaces";

export default function ImageSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="mt-4">
      <h2 className="font-medium">Images: </h2>
      <label>
        <input
          type="file"
          multiple
          accept="Images/*"
          {...register("imageFiles", {
            required: "At least one images should be added",
            validate: (files) => {
              if (files.length < 1) return "add at least one image";
              else if (files.length > 6) return "not more than six images";
              else true;
            },
          })}
          className="block border border-gray-400 w-full p-3 rounded mt-1 file:bg-cyan-500 file:border-none file:rounded-lg file:text-white file:px-3 file:py-2 file:font-semibold"
        ></input>
      </label>
      {errors.imageFiles && (
        <span className="text-red-500 font-semibold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
