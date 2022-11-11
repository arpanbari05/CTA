import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { memo, useContext, useEffect, useState } from "react";
import { StocklistContext } from "../../Contexts/StocklistContext";
import { StoreType } from "../../types/store.types";
import MarkerInfo from "./MarkerInfo";

interface Props {
  center: { lat: number; lng: number };
  activeStore: StoreType | null;
}

const Map: React.FC<Props> = (props) => {
  const { center, activeStore } = props;
  const { storelist } = useContext(StocklistContext);
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);

  useEffect(() => {
    if (activeStore) {
      setActiveStoreId(activeStore["ACTUAL CLIENT STORE ID"]);
    }
  }, [activeStore]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: center.lat,
        lng: center.lng,
      }}
      zoom={13}
      clickableIcons={false}
      options={{
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        panControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
      }}
    >
      <Marker position={center} />
      {storelist.map((store, index) => (
        <Marker
          key={index}
          icon={
            "https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/icon-pin-experience.svg"
          }
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
