import { useQuery } from "react-query";
import {
  createPaymentIntent,
  fetchSingleHotel,
  fetchme,
} from "../utils/apiClient";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { BookingSummary } from "../components/BookingSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

export default function Booking() {
  const search = useSearchContext();
  const { stripePromise } = useAppContext();
  const { data: user } = useQuery("getUser", fetchme);
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  const { hotelId } = useParams();

  const { data: HotelResponse } = useQuery(
    "fetchHotelById",
    () => fetchSingleHotel(hotelId as string),
    { enabled: !!hotelId }
  );

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  // call payement intent

  const { data: paymentIntent } = useQuery(
    "createPaymentIntent",
    () => createPaymentIntent(numberOfNights, hotelId as string),
    { enabled: !!hotelId && numberOfNights > 0 }
  );

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
      <div className="w-full">
        {HotelResponse?.data && (
          <BookingSummary
            adultCount={search.adultCount}
            checkIn={search.checkIn}
            checkOut={search.checkOut}
            childCount={search.childCount}
            hotel={HotelResponse?.data}
            numberOfNights={numberOfNights}
          ></BookingSummary>
        )}
      </div>
      {/* form */}

      {user && paymentIntent && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntent.clientSecret,
          }}
        >
          {hotelId && (
            <BookingForm
              currentUser={user}
              paymentIntent={paymentIntent}
              hotelId={hotelId}
            ></BookingForm>
          )}
        </Elements>
      )}
    </div>
  );
}
