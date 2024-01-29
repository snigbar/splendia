import { useMutation } from "react-query";
import ManageHotelsForms from "../forms/ManageHotelsForms/ManageHotelsForms";
import { addMyHotel } from "../utils/apiClient";
import { useAppContext } from "../context/AppContext";

export default function AddHotel() {
  const { showToast } = useAppContext();
  const { isLoading, mutate } = useMutation(addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel saved successfully", type: "success" });
    },
    onError: (err: Error) => {
      showToast({
        message: err.message || "Failed to save hotel",
        type: "success",
      });
    },
  });

  const handleSave = (data: FormData) => {
    mutate(data);
  };

  return (
    <ManageHotelsForms
      isLoading={isLoading}
      onSave={handleSave}
    ></ManageHotelsForms>
  );
}
