import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

interface Props {
  onChange: (e: any) => void;
  value: string;
  clear: () => void;
}

const SearchInput: React.FC<Props> = (props) => {
  const { onChange, value, clear } = props;
  return (
    <SearchWrapper>
      <div className="input-container">
        <input
          onChange={onChange}
          type="search"
          placeholder="Enter Store Name, Address, Pincode"
          value={value}
        />
        {value && (
          <button className="position-absolute clear-button" onClick={clear}>
            <MdCancel color="#999" size={20} />
          </button>
        )}
      </div>
      <BiSearch size={20} color="black" />
    </SearchWrapper>
  );
};

export default SearchInput;

const SearchWrapper = styled.div`
  display: flex;
  padding-bottom: 3px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--grey);
  gap: 1rem;

  .input-container {
    flex-grow: 1;
    position: relative;

    .clear-button {
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  input {
    outline: none;
    border: none;
    padding: 0.25rem 0.4rem;
    width: 100%;
    border: 2px dotted transparent;
    box-shadow: none !important;

    &:focus {
      border: 2px dotted black;
    }

    &::-webkit-input-placeholder {
      font-family: inherit;
    }
  }
`;
