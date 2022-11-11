import styled from "styled-components";
import { Button } from "..";
import { Store } from "../../types/stocklist.types";
import { ls, sm } from "../../utils/breakpoints";
import { GoLocation } from "react-icons/go";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { RiDirectionLine } from "react-icons/ri";
import { IconButton } from "../../styles";

interface Props {
  store: Store;
  onClose: () => void;
}

const StoreInfo: React.FC<Props> = (props) => {
  const { store, onClose } = props;
  return (
    <StoreInfoWrapper>
      <div className="header">
        <div className="title">{store.name}</div>
        <div className="store-type">{store.type}</div>
      </div>
      <div className="d-grid align-items-start info-container gap-4">
        <div className="d-grid gap-4">
          <div className="link d-flex gap-2">
            <GoLocation size={25} />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=19.99,72.73999999999999`}
            >
              {store.address}
            </a>
          </div>
          {/* <div className="link d-flex gap-2">
            <IoCallOutline size={18} />
            <a href={`tel:88499494939`}>{store.phone}</a>
          </div>
          <div className="link d-flex gap-2">
            <AiOutlineMail size={18} />
            <a href={`mailto:tru@gmail.com`}>{store.email}</a>
          </div> */}
          <div className="d-flex align-items-center gap-3 w-75">
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
              className="px-2 py-2 flex-grow-1"
            >
              <RiDirectionLine size={18} />
              <div>Get directions</div>
            </Button>
          </div>
        </div>
        <div>
          <div className="title mb-2">Product Categories in Store</div>
          <div className="sub-title mb-1">{store.category.name}</div>
          <div className="categories-grid">
            {store.category.type.map((type) => (
              <div key={type}>{type}</div>
            ))}
          </div>
        </div>
        <div className="bottom-note d-flex gap-2">
          <AiOutlineInfoCircle size={24} />
          <div>
            Information on this page is subject to change without prior notice.
            Stock availability and prices will vary, so please contact the
            retailer directly for up to date information.
          </div>
        </div>
      </div>
      <div className="footer">
        <Button
          secondary
          onClick={onClose}
          className="w-100"
          styledCss="border: 1px solid var(--light-grey);"
        >
          Close
        </Button>
      </div>
    </StoreInfoWrapper>
  );
};

export default StoreInfo;

const StoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  background-color: white;
  flex-basis: 100%;
  overflow: auto;

  ${ls} {
    width: 30%;
  }

  .header {
    padding: 1.2rem 1.4rem;
    border-bottom: 1px solid #eee;
  }

  .title {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .sub-title {
    font-size: 0.95rem;
    font-weight: bold;
  }

  .store-type {
    font-size: 0.9rem;
    font-weight: lighter;
  }

  .info-container {
    max-width: 100%;
    flex-wrap: wrap;
    flex-basis: 100%;
    overflow: auto;
    padding: 1.4rem 1.7rem;

    /* .link,
    .link a {
      color: var(--blue);
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    } */

    .categories-grid {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(2, 1fr);
      font-size: 0.7rem;
      font-weight: lighter;
    }

    .bottom-note {
      font-size: 0.8rem;
      color: var(--grey);
    }
  }

  .footer {
    padding: 1.2rem;
  }

  ${sm} {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .title {
      font-size: 1.3rem;
      font-weight: bold;
    }

    .info-container {
      .categories-grid {
        font-size: 0.9rem;
      }
    }
  }
`;
