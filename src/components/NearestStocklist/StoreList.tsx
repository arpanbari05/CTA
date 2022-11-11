import styled from "styled-components";
import { Store } from "../../types/stocklist.types";
import { FiChevronRight } from "react-icons/fi";
import { useToggle } from "../../customHooks";
import { useContext } from "react";
import { StocklistContext } from "../../Contexts/StocklistContext";
import { ls } from "../../utils/breakpoints";
import { ToggleButton, Button } from "../../components";
import { IconButton } from "../../styles";
import { IoCallOutline } from "react-icons/io5";
import { RiDirectionLine } from "react-icons/ri";

interface Props {
  storelist: Store[];
}

interface StoreProps {
  store: Store;
  onClick: (store: Store) => void;
}

const StoreList: React.FC<Props> = (props) => {
  const { storelist } = props;
  const { setStore, storeDetailsToggler } = useContext(StocklistContext);
  const toggler = useToggle();

  const handleStoreItemClick = (store: Store) => {
    setStore(store);
    storeDetailsToggler.handleShow();
  };

  return (
    <Wrapper show={toggler.show}>
      <StoreListWrapper show={toggler.show}>
        {storelist.map((store) => (
          <StoreItem
            key={store.id}
            onClick={handleStoreItemClick}
            store={store}
          />
        ))}
      </StoreListWrapper>
      <ToggleButton
        className="only-landscape"
        open={toggler.show}
        onClick={toggler.handleToggle}
      />
    </Wrapper>
  );
};

export default StoreList;

const StoreItem: React.FC<StoreProps> = (props) => {
  const { store, onClick } = props;
  const hovered = useToggle();
  return (
    <StoreWrapper
      onMouseEnter={hovered.handleShow}
      onMouseLeave={hovered.handleHide}
      onClick={() => onClick(store)}
    >
      <div className="inner-container">
        {hovered.show ? (
          <img
            src={
              "https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/icon-pin-experience.svg"
            }
            alt="marker logo"
            className="location-logo"
          />
        ) : (
          <div className="blue-dot" />
        )}
        <div className="d-grid gap-2">
          {/* <div className="experience-store">{store.type}</div> */}
          <div className="store-name">{store.name}</div>
        </div>
        <FiChevronRight
          className={`ml-auto ${!hovered.show && ""}`}
          color="black"
          size={22}
        />
      </div>
      <div
        style={{ borderBottom: "1px solid #ddd" }}
        className="d-flex align-items-center gap-3 w-75 py-3"
      >
        <IconButton
          as="a"
          className="button text-dark"
          href={`tel:${store.phone}`}
        >
          <IoCallOutline size={18} />
        </IconButton>
        <Button
          styledCss="border: 1px solid #ddd;"
          secondary
          className="px-2 py-2 flex-grow-1 bg-transparent"
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <RiDirectionLine size={18} />
            <div>Get directions</div>
          </div>
        </Button>
      </div>
    </StoreWrapper>
  );
};

const StoreListWrapper = styled.div<{ show: boolean }>`
  ${ls}, (max-width: 1024px) {
    height: 55vh;
    padding-top: 1.5rem;
    overflow: ${(props) => (props.show ? "auto" : "unset")};
  }
`;

const Wrapper = styled.div<{ show: boolean }>`
  flex-basis: 100%;
  overflow: auto;
  transition: all 0.2s;
  background-color: white;
  border-radius: 1rem 1rem 0 0;

  ${ls}, (max-width: 1024px) {
    position: fixed;
    bottom: ${(props) => (props.show ? "0" : "2rem")};
    left: 0;
    width: 100%;
    transform: ${(props) =>
      props.show ? "translateY(0)" : "translateY(100%)"};
    z-index: 300;
    overflow: visible;
  }
`;

const StoreWrapper = styled.button`
  padding: 1.2rem 1.4rem;
  padding-bottom: 0;
  width: 100%;

  .inner-container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.7rem;
  }

  .location-logo {
    width: 1.8rem;
    height: 1.8rem;
    object-fit: contain;
    position: relative;
  }
  .store-name {
    display: -webkit-box;
    font-size: 1.2rem;
    text-align: left;
    overflow: hidden;
    max-height: 2.64em;
    line-height: 1.32;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  .experience-store {
    font-size: 0.85rem;
    font-weight: bold;
    color: var(--blue);
    text-transform: uppercase;
    text-align: left;
  }

  .blue-dot {
    width: 1.8rem;
    height: 1.8rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--blue);
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);

    .store-name {
      font-weight: bold;
    }
  }
`;
