import { Store } from "./../types/stocklist.types";
import { createContext } from "react";

interface StocklistContextTypes {
  location: { name: string; lat: number; lng: number };
  store: Store | null;
  setLocation: (arg: { lat: number; lng: number; name: string }) => void;
  setStore: (store: Store | null) => void;
  storeDetailsToggler: {
    show: boolean;
    handleHide: () => void;
    handleShow: () => void;
    handleToggle: () => void;
  };
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
});
