import { HotelsResponseType } from "../interfaces/interfaces";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelsResponseType;
};

export const BookingSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="space-y-4 py-4 px-3 bg-sky-100 rounded-lg">
      <h1 className="text-lg font-medium">Your Booking Details:</h1>

      <div className="p-2 border-b border-slate-300 space-y-2">
        <div>
          Location:
          <p className="font-medium">
            {hotel.city}, {hotel.country}
          </p>
        </div>
      </div>

      <div className="flex justify-between p-2 border-b border-slate-300">
        <p>
          Checkin:
          <span className="block font-medium">{checkIn.toDateString()}</span>
        </p>
        <p>
          CheckOut:
          <span className="block font-medium">{checkOut.toDateString()}</span>
        </p>
      </div>

      <p>
        Total length of Staying:
        <span className="font-medium"> {numberOfNights} Nights</span>
      </p>

      <div>
        Total Guests:
        <p className="font-medium">
          {adultCount > 1 ? `${adultCount} Adults` : `${adultCount} Adult`},{" "}
          {childCount > 1 ? `${childCount} children` : `${childCount} child`}
        </p>
      </div>
    </div>
  );
};
