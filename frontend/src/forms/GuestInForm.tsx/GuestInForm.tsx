import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
  adultCount: number;
  childCount: number;
};

type GuestInFromData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
export const GuestInForm = ({
  hotelId,
  pricePerNight,
  adultCount,
  childCount,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInFromData>({
    defaultValues: {
      checkOut: search.checkOut,
      checkIn: search.checkIn,
      childCount: search.childCount,
      adultCount: search.adultCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  //   handle signin
  const onSignInClick = (data: GuestInFromData) => {
    search.saveSearchValue(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/signin", { state: { from: location } });
  };

  //   handle submit
  const onSubmit = (data: GuestInFromData) => {
    search.saveSearchValue(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 shadow-md bg-white sticky top-5 text-indigo-600">
      <h1 className="text-lg font-semibold">
        Price Per Night: {pricePerNight}$
      </h1>
      <form
        className="flex flex-col items-center gap-4 w-full"
        onSubmit={handleSubmit(isLoggedIn ? onSubmit : onSignInClick)}
      >
        <ReactDatePicker
          required
          selected={checkIn}
          onChange={(date: Date) => setValue("checkIn", date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full bg-white p-2 border border-indigo-600 text-slate-900"
          wrapperClassName="w-full"
        />

        <ReactDatePicker
          required
          selected={checkOut}
          onChange={(date: Date) => setValue("checkOut", date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full bg-white p-2 border border-indigo-600 text-slate-900"
          wrapperClassName="w-full"
        />

        <div className="flex bg-white px-2 py-1 gap-2">
          <label className="items-center flex font-semibold">
            Adults:
            <input
              className="w-full px-3 py-2 focus:outline-none font-bold border border-slate-300 text-center ms-1 text-slate-900"
              type="number"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                validate: (val: number) => {
                  if (val > adultCount)
                    return `maximum adult capacity is ${adultCount}`;
                  else return true;
                },
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="items-center flex font-semibold">
            Children:
            <input
              className="w-full px-3 py-2 focus:outline-none font-bold border border-slate-300 text-center ms-1 text-slate-900"
              type="number"
              min={0}
              max={20}
              {...register("childCount", {
                valueAsNumber: true,
                validate: (val: number) => {
                  if (val > childCount)
                    return `maximum child capacity is ${childCount}`;
                  else return true;
                },
              })}
            />
          </label>
        </div>
        {errors.adultCount && (
          <span className="text-red-500 font-semibold text-sm">
            {errors.adultCount.message}
          </span>
        )}
        {errors.childCount && (
          <span className="text-red-500 font-semibold text-sm">
            {errors.childCount.message}
          </span>
        )}
        {isLoggedIn ? (
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white rounded-full inset-1 hover:bg-indigo-600"
          >
            Book Now
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white rounded-full inset-1 hover:bg-indigo-600"
          >
            Sign In
          </button>
        )}
      </form>
    </div>
  );
};
