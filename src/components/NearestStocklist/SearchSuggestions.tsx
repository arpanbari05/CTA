import styled from "styled-components";

interface Props {
  list: {
    position: { lat: number; lng: number };
    address: string;
  }[];
  onItemClick: (item: any) => void;
}

const SearchSuggestions: React.FC<Props> = (props) => {
  const { list, onItemClick } = props;

  return (
    <SearchSuggestionsWrapper>
      {list.map((ele) => (
        <SuggestionItem onClick={() => onItemClick(ele)}>
          {ele.address}
        </SuggestionItem>
      ))}
    </SearchSuggestionsWrapper>
  );
};

export default SearchSuggestions;

const SearchSuggestionsWrapper = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 1px;
  transform: translateY(100%);
  border-radius: 3px;
  overflow: hidden;
  border-bottom: 1px solid var(--light-grey);
  padding-bottom: 0.7rem;
  max-height: 16.4rem;
  overflow: auto;
  z-index: 1;
  background-color: white;
`;

const SuggestionItem = styled.button`
  width: 100%;
  padding: 0.6rem 1.4rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: black;
  text-align: left;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
