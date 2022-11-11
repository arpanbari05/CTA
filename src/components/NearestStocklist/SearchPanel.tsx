import styled from "styled-components";
import SearchInput from "./SearchInput";
// import { usePlacesWidget } from "react-google-autocomplete";
import { useContext, useState } from "react";
import { StocklistContext } from "../../Contexts/StocklistContext";
import { ls, sm } from "../../utils/breakpoints";
import cities from "../../config/cities.json";
import SearchSuggestions from "./SearchSuggestions";
import { useToggle } from "../../customHooks";
import StoreList from "./StoreList";
import stores from "../../config/stores.json";

interface Props {}

const SearchPanel: React.FC<Props> = (props) => {
  const { setLocation } = useContext(StocklistContext);
  const [searchQuery, setSearchQuery] = useState("");
  const searchSuggestion = useToggle(false);
  // const { ref } = usePlacesWidget({
  //   apiKey: process.env.REACT_APP_BILLING_ACCOUNT_GOOGLE_API_KEY || "",
  //   onPlaceSelected: (place) => {
  //     if (place.geometry?.location && place.formatted_address)
  //       setLocation({
  //         lat: place.geometry?.location?.lat(),
  //         lng: place.geometry?.location?.lng(),
  //         name: place.formatted_address,
  //       });
  //   },
  // });

  const handleSearchSuggestionClick = (item: any) => {
    setSearchQuery(item.address);
    searchSuggestion.handleHide();
    setLocation(item);
  };

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  const showSuggestions = searchQuery && cities && searchSuggestion.show;

  return (
    <SearchPanelWrapper>
      <div className="position-relative">
        <div className="header pr-5 d-grid gap-3">
          <SearchInput
            clear={handleClearSearchQuery}
            onChange={(e: any) => {
              if (e.target) {
                setSearchQuery(e.target.value);
                searchSuggestion.handleShow();
              }
            }}
            value={searchQuery}
          />
        </div>
        {showSuggestions && (
          <SearchSuggestions
            onItemClick={handleSearchSuggestionClick}
            list={cities}
          />
        )}
      </div>
      <StoreList storelist={stores} />
    </SearchPanelWrapper>
  );
};

export default SearchPanel;

const SearchPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  background-color: white;
  flex-basis: 100%;
  overflow: auto;

  .header {
    padding: 1rem 0 1rem 1.4rem;
  }

  .title {
    font-size: 1.7rem;
    font-weight: bold;
  }

  ${ls}, (max-width: 1024px) {
    width: 100%;
    .header {
      padding: 0.7rem 0 0.7rem 1rem;
    }
    .title {
      font-size: 1.3rem;
    }
  }

  ${sm} {
    overflow: visible;
  }
`;
