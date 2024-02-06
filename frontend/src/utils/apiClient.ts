import {
  HotelsResponseType,
  THotelSearchResponse,
  TSearchParams,
} from "./../interfaces/interfaces";

import { TRegisterFormData } from "../interfaces/interfaces";
const API_BASE_URL = import.meta.env.VITE_DEV_URL || "";

export const register = async (formData: TRegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("invalid token");
  }
  const result = await response.json();
  return result;
};

export const signIn = async (data: Partial<TRegisterFormData>) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to sign in");
  }

  if (!response.ok) throw new Error("invalid credentials");

  return result;
};

export const logOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("something went wrong");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return await response.json();
};

export const fetchMyHotels = async (): Promise<{
  massage: string;
  data: HotelsResponseType[];
}> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("failed to fetch hotels");
  return await response.json();
};

export const fetchSingleHotel = async (
  id: string
): Promise<{ message: string; data: HotelsResponseType }> => {
  const result = await fetch(`${API_BASE_URL}/api/hotels/my-hotels/${id}`, {
    credentials: "include",
  });

  if (!result.ok) throw new Error("failed to fetch hotels");

  return await result.json();
};

export const updateMyHotel = async (payload: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/my-hotels/${payload.get("hotelId")}`,
    {
      method: "PUT",
      body: payload,
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("failed to update");

  return await response.json();
};

export const searchHotels = async (
  searchParams: TSearchParams
): Promise<THotelSearchResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append("destination", searchParams.destination);
  queryParams.append("checkIn", searchParams.checkIn);
  queryParams.append("checkOut", searchParams.checkOut);
  queryParams.append("adultCount", searchParams.adultCount.toString());
  queryParams.append("childCount", searchParams.adultCount.toString());
  queryParams.append("page", searchParams.page.toString());

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};
