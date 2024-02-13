import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../interfaces/interfaces";

export default function ImageSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImgUrls = watch("imageUrls");

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    url: string
  ) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingImgUrls.filter((val) => val !== url)
    );
  };

  return (
    <div className="mt-4">
      <h2 className="font-medium">Images: </h2>
      <label>
        {existingImgUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImgUrls.map((url) => (
              <div className="relative group" key={url}>
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="Images/*"
          placeholder="select images"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImgUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
          className="block border border-gray-400 w-full p-3 rounded mt-1 file:bg-indigo-500 file:border-none file:rounded-lg file:text-white file:px-3 file:py-2 file:font-semibold"
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
