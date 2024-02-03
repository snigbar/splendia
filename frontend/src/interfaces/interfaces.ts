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

export type BookingType = {
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
  bookings: BookingType[];
  createdAt?: string;
};
