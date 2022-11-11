import axios from "axios";
import { Location, State } from "../types/location.types";
import RequestcallParametersType from "../types/requestcall.type";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Headers"] = "*";

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

export const requestCall = (parameters: RequestcallParametersType) => {
  return axios.post(
    "https://o8vg80658k.execute-api.ap-south-1.amazonaws.com/prod/SmartDost_Ce_Service_Test/smartdost.svc/SubmitCustomerByLead",
    parameters,
    {
      headers: {
        UserId: "27014",
        APIToken: "8a923be0",
        APIKey: "WTg7qg2z4z",
        "Content-Type": "application/json",
      },
    }
  );
};
