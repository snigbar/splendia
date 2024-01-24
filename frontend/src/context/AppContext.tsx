import { createContext, ReactNode, useContext, useState } from "react";
import { TAppContext, TToast } from "../interfaces/interfaces";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiclient from "../utils/apiClient";
const AppContext = createContext<TAppContext | null>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<TToast | null>(null);
  const { isError } = useQuery("validateToken", apiclient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toast: TToast) => setToast(toast),
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        ></Toast>
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as TAppContext;
};

export default AppContextProvider;
