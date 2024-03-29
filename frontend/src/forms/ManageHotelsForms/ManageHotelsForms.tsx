import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import { HotelFormData, HotelsResponseType } from "../../interfaces/interfaces";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";
import { useEffect } from "react";

interface TProps {
  hotel?: HotelsResponseType;
  isLoading: boolean;
  onSave: (data: FormData) => void;
}

function ManageHotelsForms({ isLoading, onSave, hotel }: TProps) {
  const formMethods = useForm<HotelFormData>();

  const { reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = formMethods.handleSubmit((data: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel?._id);
    }

    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((val, idx) =>
      formData.append(`facilities[${idx}]`, val)
    );

    if (data.imageUrls) {
      data.imageUrls.forEach((val, idx) => {
        formData.append(`imageUrls[${idx}]`, val);
      });
    }
    Array.from(data.imageFiles).forEach((img) =>
      formData.append("imageFiles", img)
    );

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        className="w-full lg:w-3/4 mx-auto px-6 py-8 rounded-lg bg-white shadow-md flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <DetailsSection></DetailsSection>
        <TypeSection></TypeSection>
        <FacilitiesSection></FacilitiesSection>
        <GuestsSection></GuestsSection>
        <ImageSection></ImageSection>
        <span className="flex justify-center md:justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="py-3 px-6 bg-indigo-500 text-white inset-1 hover:bg-indigo-600 mt-2 text-lg"
          >
            {isLoading ? "creating..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelsForms;
