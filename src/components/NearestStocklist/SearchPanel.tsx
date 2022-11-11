import styled from "styled-components";
import SearchInput from "./SearchInput";
import {  useState } from "react";
import { ls, sm } from "../../utils/breakpoints";
import { useStoreLocatorSearch, useToggle } from "../../customHooks";
import StoreList from "./StoreList";

interface Props {
  show?: boolean;
}

const SearchPanel: React.FC<Props> = (props) => {
  const { show = true } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const searchSuggestion = useToggle(false);
  const { filteredStores } = useStoreLocatorSearch(searchQuery);
  const storelistToggler = useToggle();

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <SearchPanelWrapper show={show}>
      <div className="position-relative">
        <div className="header pr-5 d-grid gap-3">
          <SearchInput
            clear={handleClearSearchQuery}
            onChange={(e: any) => {
              storelistToggler.handleShow();
              if (e.target) {
                setSearchQuery(e.target.value);
                searchSuggestion.handleShow();
              }
            }}
            value={searchQuery}
          />
        </div>
      </div>
      <StoreList toggler={storelistToggler} storelist={filteredStores} />
    </SearchPanelWrapper>
  );
};

export default SearchPanel;

const SearchPanelWrapper = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
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
