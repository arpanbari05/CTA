import { Location, State } from "./../types/location.types";
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { fields as loyaltyFormFields } from "../config/loyalform";
import {
  fetchCities,
  fetchCurrentLocation,
  fetchStates,
  requestCall,
} from "../services";
import RequestcallParametersType from "../types/requestcall.type";
import { StoreType } from "../types/store.types";
import { StocklistContext } from "../Contexts/StocklistContext";
import Papa, { ParseResult } from "papaparse";

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

export const useStoreLocatorSearch = (searchQuery: string) => {
  const { storelist, getStoresInCity } = useContext(StocklistContext);
  const [filteredStores, setFilteredStores] = useState<StoreType[]>([]);
  const { data } = useCurrentLocation();

  const getFilteredStorelist = useCallback(() => {
    if (!data?.city) return;
    const storesInCity = getStoresInCity(data.city);
    if (!searchQuery) return storesInCity;
    return storelist.filter((store) => {
      const name = store["BUSINESS / BRAND NAME"].split(" ");
      const pincode = store.POSTCODE;
      const locality = store.LOCALITY;
      const state = store.STATE;
      const city = store.CITY;
      const matches = [pincode, locality, state, city]
        .concat(name)
        .some((item) =>
          item.toUpperCase().startsWith(searchQuery.toUpperCase())
        );
      return matches;
    });
  }, [searchQuery, storelist, getStoresInCity, data?.city]);

  useEffect(() => {
    const filteredStores = getFilteredStorelist();
    if (filteredStores) {
      setFilteredStores(filteredStores);
    }
  }, [getFilteredStorelist]);

  return { filteredStores };
};

export const useLoyaltyFormFields = (state: any, setValue: any) => {
  const [fields, setFields] = useState([...loyaltyFormFields]);
  const { storelist, getStates, getCities } = useCSVData();
  const [storeSearchQuery, setStoreSearchQuery] = useState("");
  const [shouldInitializeStore, setShouldInitializeStore] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { data } = useCurrentLocation();

  const getStoresInCity = useCallback(() => {
    return storelist.filter((store) => {
      const storeName = store["BUSINESS / BRAND NAME"].toUpperCase();
      const locality = store.LOCALITY.toUpperCase();
      return (
        store.CITY === state.city &&
        (storeName.includes(storeSearchQuery.toUpperCase().trim()) ||
          locality.startsWith(storeSearchQuery.toUpperCase().trim()))
      );
    });
  }, [state.city, storeSearchQuery, storelist]);

  const getCategory = useCallback(() => {
    // if (isProductDetailsOpen) {
    //   const product = getProduct(currentProductId);
    //   if (product?.category) {
    //     return product.category;
    //   } else return "AV";
    // } else return "AV";
    return "AV";
  }, []);

  const cityFieldIndex = fields.findIndex((field) => field.name === "city");

  const stateFieldIndex = fields.findIndex((field) => field.name === "state");

  useEffect(() => {
    setShouldInitializeStore(true);
  }, [state.city]);

  useEffect(() => {
    setFields((prev) => {
      const tempFields = [...prev];
      const storesInCity = getStoresInCity();
      const storesFieldIndex = tempFields.findIndex(
        (field) => field.name === "store"
      );
      tempFields[storesFieldIndex].options = storesInCity;
      return tempFields;
    });
  }, [setFields, getStoresInCity, getStates, stateFieldIndex]);

  useEffect(() => {
    const states = getStates();
    setFields((prev) => {
      const tempFields = [...prev];
      tempFields[stateFieldIndex].options = states;
      return tempFields;
    });
  }, [getStates, stateFieldIndex]);

  useEffect(() => {
    const cities = getCities(state.state);
    setValue("city", cities[0]);

    setFields((prev) => {
      const tempFields = [...prev];
      tempFields[cityFieldIndex].options = cities;
      return tempFields;
    });
  }, [getCities, state.state, setValue, cityFieldIndex]);

  useEffect(() => {
    setTimeout(() => {
      if (initialized || !data) return;

      const stateOptions = fields[stateFieldIndex].options;
      const cityOptions = fields[cityFieldIndex].options;

      if (stateOptions?.length) {
        setValue("state", data.region);
      }
      if (cityOptions?.length) {
        setValue("city", data.city);
      }
      if (cityOptions?.length && stateOptions?.length) {
        setInitialized(true);
      }
    }, 10);
  }, [cityFieldIndex, fields, initialized, setValue, stateFieldIndex, data]);

  return {
    fields,
    currentLocation: data,
    getCategory,
    setStoreSearchQuery,
    shouldInitializeStore,
    setShouldInitializeStore,
  };
};

export const useCSVData = () => {
  const [storelist, setStorelist] = useState<StoreType[]>([]);

  const getCSV = useCallback(() => {
    Papa.parse(
      "https://content.helloviewer.io/samsung_content/documents/Master_SmartPlaza.csv",
      {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: (results: ParseResult<StoreType>) => {
          setStorelist(results.data);
        },
      }
    );
  }, []);

  const getStates = useCallback(() => {
    const filteredStates = storelist.map((store) => store.STATE);
    return [...new Set(filteredStates)];
  }, [storelist]);

  const getCities = useCallback(
    (state: string) => {
      const filteredCities: string[] = [];
      storelist.forEach((store) => {
        if (store.STATE === state) {
          filteredCities.push(store.CITY);
        }
      });
      return [...new Set(filteredCities)];
    },
    [storelist]
  );

  const getStoresInCity = useCallback(
    (city: string) => {
      return storelist.filter((store) => {
        return store.CITY === city;
      });
    },
    [storelist]
  );

  useEffect(() => {
    getCSV();
  }, [getCSV]);

  return { storelist, getStates, getCities, getStoresInCity };
};

export const useRequestCall = () => {
  const mutation = useMutation(
    "request_call",
    (requestCallParameters: RequestcallParametersType) =>
      requestCall(requestCallParameters)
  );

  return mutation;
};

export const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (arg0: { target: any }) => void
) => {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
