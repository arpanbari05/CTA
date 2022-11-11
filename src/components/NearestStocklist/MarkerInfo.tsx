import styled from "styled-components";

interface Props {
  info: { name: string };
}

const MarkerInfo: React.FC<Props> = (props) => {
  const { info } = props;
  return (
    <InfoWrapper>
      <div className="name">{info.name}</div>
    </InfoWrapper>
  );
};

export default MarkerInfo;

const InfoWrapper = styled.div`
  padding: 0.7rem;
  .name {
    font-size: 1rem;
    font-family: "SamsungOne";
    font-weight: bold;
  }
`;
