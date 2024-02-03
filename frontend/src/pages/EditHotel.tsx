import ManageHotelsForms from "../forms/ManageHotelsForms/ManageHotelsForms";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "../utils/apiClient";
import { useParams } from "react-router-dom";

export default function EditHotel() {
  const { showToast } = useAppContext();
  const { hotelId } = useParams();
  const queryClient = useQueryClient();

  const { data: hotelData } = useQuery(
    "fetchHotelById",
    async () => {
      return await apiClient.fetchSingleHotel(hotelId || "");
    },
    {
      enabled: !!hotelId,
    }
  );

  const mutation = useMutation(apiClient.updateMyHotel, {
    onSuccess: () => {
      showToast({ message: "update successful", type: "success" });
      queryClient.invalidateQueries("fetchHotelById");
    },
    onError: (err: Error) => {
      showToast({
        message: err.message || "update failed",
        type: "error",
      });
    },
  });

  const onSave = (formData: FormData) => {
    mutation.mutate(formData);
  };

  return (
    <ManageHotelsForms
      hotel={hotelData?.data}
      onSave={onSave}
      isLoading={mutation.isLoading}
    ></ManageHotelsForms>
  );
}
