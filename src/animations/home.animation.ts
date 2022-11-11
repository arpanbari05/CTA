import { sm } from "./../utils/breakpoints";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  from {
    transform: translateY(-170px);
    opacity: 0;
  } to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideUp = keyframes`
  from {
    transform: translateY(170px);
    opacity: 0;
  } to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SlideUpWrapper = styled.div`
  animation: ${slideUp} 0.6s;
  ${sm} {
    animation: unset;
  }
`;
const SlideDownWrapper = styled.div`
  animation: ${slideDown} 0.6s;
`;

export { slideUp, slideDown, SlideDownWrapper, SlideUpWrapper };
