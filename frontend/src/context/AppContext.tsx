import { createContext, ReactNode, useContext } from "react";
import { TAppContext, TToast } from "../interfaces/interfaces";

const AppContext = createContext<TAppContext | null>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppContext.Provider
      value={{ showToast: (toast: TToast) => console.log(toast) }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as TAppContext;
};

export default AppContextProvider;
