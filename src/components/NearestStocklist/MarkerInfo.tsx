import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlinePhone } from "react-icons/hi";
import { StoreType } from "../../types/store.types";

interface Props {
  store: StoreType;
}

const MarkerInfo: React.FC<Props> = (props) => {
  const { store } = props;
  const email = store["STORE EMAIL ID"];
  const phone = `+${store["MAIN PHONE NO."]}`;
  return (
    <InfoWrapper>
      <div className="name">{store["BUSINESS / BRAND NAME"]}</div>
      <a className="d-flex align-items-center gap-2" href={`mailto:${email}`}>
        <AiOutlineMail color="inherit" size={15} />
        <div>{email}</div>
      </a>
      <a className="d-flex align-items-center gap-2" href={`tel:${phone}`}>
        <HiOutlinePhone color="inherit" size={15} />
        <div>{phone}</div>
      </a>
    </InfoWrapper>
  );
};

export default MarkerInfo;

const InfoWrapper = styled.div`
  padding: 0.25rem;
  display: grid;
  gap: 0.3rem;
  .name {
    font-size: 1rem;
    font-family: "SamsungOne";
    font-weight: bold;
  }
`;
