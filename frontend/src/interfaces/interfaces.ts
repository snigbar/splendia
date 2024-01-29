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
  type: THotelType;
  pricePerNight: number;
  starRating: 1 | 2 | 3 | 4 | 5;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};
