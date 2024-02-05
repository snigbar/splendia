import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AppContextProvider from "./context/AppContext.tsx";
import SearchContext from "./context/SearchContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContext>
          <App />
        </SearchContext>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
