import { Location, State } from "./../types/location.types";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { fields as loyaltyFormFields } from "../config/loyalform";
import { fetchCities, fetchCurrentLocation, fetchStates } from "../services";

export function useToggle(initialValue = false): {
  show: boolean;
  handleShow: () => void;
  handleHide: () => void;
  handleToggle: () => void;
} {
  const [show, setShow] = useState(initialValue);

  const handleShow = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleHide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleToggle = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);

  return {
    show,
    handleHide,
    handleShow,
    handleToggle,
  };
}

export function useWindowSize() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      window.addEventListener("resize", function () {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
    }

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  return {
    width,
    height,
    isMobileScreen: width <= 567,
    isTabletScreen: width <= 1025,
    isLandscapeScreen: width <= 950 && height <= 450,
  };
}

export function usePagination(indexes: number[] = []) {
  const [currentIndex, setCurrentIndex] = useState<number>(indexes[0] || 0);

  const isNextEnabled = currentIndex < indexes.length - 1;
  const isPrevEnabled = currentIndex > 0;

  function handleNext() {
    if (isNextEnabled) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (isPrevEnabled) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function resetIndex() {
    setCurrentIndex(0);
  }

  return {
    currentIndex,
    handleNext,
    handlePrev,
    resetIndex,
    isNextEnabled,
    isPrevEnabled,
  };
}

export const useCurrentLocation = () => {
  const { data, isError, isLoading, error } = useQuery<
    Location,
    AxiosError<any>
  >("my_location", fetchCurrentLocation, {
    select: (data: any) => ({
      ...data.data,
    }),
  });

  return {
    data,
    isError,
    isLoading,
    error,
  };
};

export const useStatesAndCities = (state: string) => {
  const {
    data: states,
    isLoading: isStateLoading,
    isError: isStateError,
    error: stateError,
  } = useQuery<State[], AxiosError<any>>("states", fetchStates, {
    select: (data: any) => data.data.data.states,
  });
  const {
    data: cities,
    isLoading: isCityLoading,
    isError: isCityError,
    error: cityError,
  } = useQuery<string[], AxiosError<any>>(
    ["cities", state],
    () => fetchCities(state),
    {
      select: (data: any) => data.data.data,
      enabled: Boolean(state),
    }
  );

  return {
    states,
    cities,
    isCityError,
    isCityLoading,
    cityError,
    isStateLoading,
    isStateError,
    stateError,
  };
};

export const useLoyaltyFormFields = (state: string) => {
  const fields = [...loyaltyFormFields];

  // const { cities, states } = useStatesAndCities(state);

  // if (states) {
  //   const stateFieldIndex = fields.findIndex((field) => field.name === "state");
  //   fields[stateFieldIndex].options = states;
  // }

  // if (cities) {
  //   const cityFieldIndex = fields.findIndex((field) => field.name === "city");
  //   fields[cityFieldIndex].options = cities;
  // }

  return fields;
};
