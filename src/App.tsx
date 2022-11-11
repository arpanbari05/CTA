import React from "react";
import LoyaltyForm from "./components/Form/LoyaltyForm";
import NearestStocklist from "./components/NearestStocklist/NearestStocklist";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface Props {}

const App: React.FC<Props> = () => {
  const urlQueryStrings = new URLSearchParams(window.location.search);
  const type = urlQueryStrings.get("type");
  return type === "store-locator" ? (
    <NearestStocklist />
  ) : type === "loyalty-form" ? (
    <LoyaltyForm />
  ) : (
    <React.Fragment />
  );
};

export default App;
