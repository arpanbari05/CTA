import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import styled from "styled-components";
import { CloseButton } from "..";
import SearchPanel from "./SearchPanel";
import { StocklistContext } from "../../Contexts/StocklistContext";
import { ls, md } from "../../utils/breakpoints";
import { StoreType } from "../../types/store.types";
import { useCSVData, useToggle, useWindowSize } from "../../customHooks";
import StoreInfo from "./StoreInfo";
import Map from "./Map";

const libraries: "places"[] = ["places"];

interface Props {}

const NearestStocklist: React.FC<Props> = (props) => {
  const { storelist, getStoresInCity } = useCSVData();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      process.env.REACT_APP_BILLING_ACCOUNT_GOOGLE_API_KEY || "",
    libraries: libraries,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    lat: 0,
    lng: 0,
  });
  const [activeStore, setActiveStore] = useState<StoreType | null>(null);
  const storeDetailsToggler = useToggle(false);
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });
  const { height } = useWindowSize();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const StocklistContextValue = {
    location: selectedLocation,
    store: activeStore,
    setStore: setActiveStore,
    setLocation: setSelectedLocation,
    storeDetailsToggler,
    storelist,
    getStoresInCity,
  };

  const showStoreInfo = Boolean(storeDetailsToggler.show && activeStore);

  const handleClose = () => {
    window.parent.postMessage({ type: "oniframeclose" }, "*");
  };

  if (!isLoaded) return null;

  return (
    <StocklistContext.Provider value={StocklistContextValue}>
      <Container fullScreenHeight={height}>
        <StocklistWrapper className="d-flex w-100 h-100">
          <CloseButton
            id={"nearest-stocklist-close-btn"}
            styledCss={`
                position: absolute;
                top: -2rem;
                right: -2rem;
                background: none;
                color: white;
                z-index: 1;
                ${ls}, (max-width: 1024px) {
                  top: .9rem;
                  right: .9rem;
                  background: white;
                  color: black;
                }
            `}
            onClick={handleClose}
          />
          <div className="d-flex flex-column">
            <div className="heading">Find a store</div>
            {storeDetailsToggler.show && activeStore && (
              <StoreInfo
                store={activeStore}
                onClose={storeDetailsToggler.handleHide}
              />
            )}
            <SearchPanel show={!showStoreInfo} />
          </div>
          <Map activeStore={activeStore} center={center} />
        </StocklistWrapper>
      </Container>
    </StocklistContext.Provider>
  );
};

export default NearestStocklist;

const Container = styled.div<{ fullScreenHeight: number }>`
  position: relative;
  width: 80%;
  height: 88vh;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 0.3rem;

  ${md} {
    width: 100vw;
    height: ${(props) => props.fullScreenHeight}px;
    border-radius: 0;
  }
`;

const StocklistWrapper = styled.div`
  border-radius: 0.3rem;
  overflow: hidden;

  .heading {
    font-size: 1.7rem;
    font-weight: bold;
    padding: 1.2rem 1.4rem;
    padding-bottom: 0;
  }

  ${ls} {
    flex-direction: column;
    border-radius: 0;
  }
  ${md} {
    flex-direction: column;
    border-radius: 0;
  }
`;
