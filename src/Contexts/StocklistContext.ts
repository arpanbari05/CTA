import { StoreType } from "../types/store.types";
import { createContext } from "react";

interface StocklistContextTypes {
  location: { name: string; lat: number; lng: number };
  store: StoreType | null;
  setLocation: (arg: { lat: number; lng: number; name: string }) => void;
  setStore: (store: StoreType | null) => void;
  storeDetailsToggler: {
    show: boolean;
    handleHide: () => void;
    handleShow: () => void;
    handleToggle: () => void;
  };
  storelist: StoreType[];
  getStoresInCity: (city: string) => StoreType[];
}

export const StocklistContext = createContext<StocklistContextTypes>({
  location: { name: "", lat: 0, lng: 0 },
  store: null,
  setStore: () => {},
  setLocation: () => {},
  storeDetailsToggler: {
    show: false,
    handleHide: () => {},
    handleShow: () => {},
    handleToggle: () => {},
  },
  storelist: [],
  getStoresInCity: () => [],
});
