import axios from "axios";
import { Location, State } from "../types/location.types";

export const fetchCurrentLocation: () => Promise<Location> = () => {
  return axios.get("https://ipapi.co/json/");
};

export const fetchStates: () => Promise<State[]> = () => {
  return axios.post("https://countriesnow.space/api/v0.1/countries/states", {
    country: "India",
  });
};

export const fetchCities: (state: string) => Promise<string[]> = (state) => {
  return axios.post(
    "https://countriesnow.space/api/v0.1/countries/state/cities",
    {
      country: "India",
      state,
    }
  );
};
