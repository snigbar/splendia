import { useForm } from "react-hook-form";
import {
  TBookingFormData,
  TPaymentIntentResponse,
  TUserResponse,
} from "../../interfaces/interfaces";
import { useSearchContext } from "../../context/SearchContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "react-query";
import { createBooking } from "../../utils/apiClient";
import { useAppContext } from "../../context/AppContext";

type Props = {
  currentUser: TUserResponse;
  paymentIntent: TPaymentIntentResponse;
  hotelId: string;
};

export default function BookingForm({
  currentUser,
  paymentIntent,
  hotelId,
}: Props) {
  const { showToast } = useAppContext();
  const search = useSearchContext();
  const stripe = useStripe();
  const element = useElements();

  const { mutate: bookRoom, isLoading } = useMutation(createBooking, {
    onSuccess: () => {
      showToast({ message: "Booking Completed!", type: "success" });
    },
    onError: (err: Error) => {
      showToast({
        message: err.message || "Error saving booking",
        type: "error",
      });
    },
  });

  const { register, handleSubmit } = useForm<TBookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentId,
    },
  });

  const onSubmit = async (formdata: TBookingFormData) => {
    if (!stripe || !element) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: element.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formdata, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-lg bg-white shadow-md p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="bg-indigo-100 p-4 rounded-lg text-center">
        <h1>Total Cost: {paymentIntent.totalCost?.toFixed(2)}$</h1>
        <p className="text-sm font-medium">Including Taxes and Charges</p>
      </div>

      <div className="rounded-lg p-2 space-y-2">
        <h1 className="font-semibold">
          Enter Your payment details:{" "}
          <span className="text-xs font-medium">
            (use 4242 4242 4242 4242 as test)
          </span>
        </h1>
        <CardElement
          id="payment-element"
          className="border border-indigo-400 rounded-md p-3 bg-slate-50 font-medium text-lg"
        ></CardElement>
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-indigo-600 text-white px-4 py-3 font-bold hover:bg-indigo-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}
