import { Stripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

export type THotelType =
  | "Budget"
  | "Boutique"
  | "Luxury"
  | "Ski Resort"
  | "Business"
  | "Family"
  | "Romantic"
  | "Hiking Resort"
  | "Cabin"
  | "Beach Resort"
  | "Golf Resort"
  | "Motel"
  | "All Inclusive"
  | "Pet Friendly"
  | "Self Catering";

export type THotelFacility =
  | "Free WiFi"
  | "Parking"
  | "Airport Shuttle"
  | "Family Rooms"
  | "Non-Smoking Rooms"
  | "Outdoor Pool"
  | "Spa"
  | "Fitness Center";

export type TToast = {
  message: string;
  type: "error" | "success";
};

export type TAppContext = {
  showToast: (toast: TToast) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

export interface TChildren {
  children: ReactNode;
}

export type TRegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

export type TBookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type TUserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type HotelsResponseType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: TBookingType[];
  createdAt?: string;
};

export type TSearchParams = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  page: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export type TSearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValue: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
};

export type THotelSearchResponse = {
  message: string;
  data: HotelsResponseType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type TPaymentIntentResponse = {
  clientSecret: string;
  paymentId: string;
  totalCost: number;
};

export type TBookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  hotelId: string;
  totalCost: number;
  paymentIntentId: string;
  checkIn: string;
  checkOut: string;
};
