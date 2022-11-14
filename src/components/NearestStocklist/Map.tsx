import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { memo, useContext, useEffect, useState } from "react";
import { StocklistContext } from "../../Contexts/StocklistContext";
import { StoreType } from "../../types/store.types";
import MarkerInfo from "./MarkerInfo";

const SAMSUNG_PIN_ICON =
  "https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/icon-pin-experience.svg";

const libraries: "places"[] = ["places"];
interface Props {
  activeStore: StoreType | null;
}

const Map: React.FC<Props> = (props) => {
  const { activeStore } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      process.env.REACT_APP_BILLING_ACCOUNT_GOOGLE_API_KEY || "",
    libraries: libraries,
  });
  const { storelist } = useContext(StocklistContext);
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (activeStore) {
      setActiveStoreId(activeStore["ACTUAL CLIENT STORE ID"]);
    }
  }, [activeStore]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const MAP_OPTIONS = {
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
    panControl: false,
    streetViewControl: false,
  };

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      clickableIcons={false}
      options={{
        ...MAP_OPTIONS,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
      }}
    >
      <Marker position={center} />
      {storelist.map((store, index) => (
        <Marker
          key={index}
          icon={SAMSUNG_PIN_ICON}
          position={{ lat: +store.LATITUDE, lng: +store.LONGITUDE }}
          onClick={() => setActiveStoreId(store["ACTUAL CLIENT STORE ID"])}
        >
          {activeStoreId === store["ACTUAL CLIENT STORE ID"] && (
            <InfoWindow onCloseClick={() => setActiveStoreId(null)}>
              <MarkerInfo store={store} />
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

export default memo(Map);

const containerStyle = {
  flexGrow: 1,
  height: "100%",
};
