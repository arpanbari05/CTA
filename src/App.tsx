import React from "react";
import LoyaltyForm from "./components/Form/LoyaltyForm";
import NearestStocklist from "./components/NearestStocklist/NearestStocklist";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 1000, // caching remains in store for 60 seconds
    },
  },
});

interface Props {}

const App: React.FC<Props> = () => {
  const urlQueryStrings = new URLSearchParams(window.location.search);
  const type = urlQueryStrings.get("type");
  return (
    <QueryClientProvider client={queryClient}>
      {type === "store-locator" ? (
        <NearestStocklist />
      ) : type === "loyalty-form" ? (
        <LoyaltyForm />
      ) : (
        <React.Fragment />
      )}
    </QueryClientProvider>
  );
};

export default App;
