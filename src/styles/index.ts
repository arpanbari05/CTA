import { ls, sm, xxs } from "./../utils/breakpoints";
import styled from "styled-components";

export const HeadingPrimary = styled.div<{ css?: string }>`
  font-size: 42px;
  font-weight: bold;
  font-family: Samsung Sharp Sans;
  letter-spacing: 2px;
  color: white;
  text-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);

  ${ls} {
    font-size: 20px;
  }

  ${sm} {
    font-size: 28px;
  }

  ${xxs} {
    font-size: 20px;
  }

  ${(props) => props.css}
`;

export const HeadingSecondary = styled.div<{ css?: string }>`
  font-size: 20px;
  color: black;
  font-weight: bolder;

  ${sm} {
    font-size: 16px;
  }

  ${(props) => props.css}
`;

export const HeadingTertiary = styled.div<{ css?: string }>`
  font-size: 22px;
  color: black;
  font-weight: bolder;

  ${sm} {
    font-size: 18px;
  }

  ${(props) => props.css}
`;

export const SubHeading = styled.div<{ css?: string }>`
  color: white;
  font-size: 26px;
  text-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);

  ${ls} {
    font-size: 16px;
  }

  ${sm} {
    font-size: 20px;
  }

  ${xxs} {
    font-size: 16px;
  }

  ${(props) => props.css}
`;

export const ButtonWrapper = styled.button<{
  primary: boolean;
  secondary: boolean;
  css: string;
  active: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 999px;
  padding: 8px 25px;
  color: white;
  background: ${(props) =>
    props.color
      ? props.color
      : props.primary
      ? "black"
      : props.secondary
      ? "white"
      : "var(--light-blue)"};
  font-size: 16px;
  font-weight: bold;
  border: 2px solid
    ${(props) => (props.active ? "var(--light-blue)" : "transparent")};
  color: ${(props) => (props.secondary ? "black" : "white !important")};
  transition: all 0.2s;

  ${(props) =>
    props.disabled &&
    `
    background-color: var(--light-grey);
  `}

  ${ls} {
    font-size: 13px;
    padding: 6px 10px;
  }

  ${sm} {
    font-size: 14px;
    padding: 5px 13px;
  }
  ${(props) => props.css}
`;

export const ToggleButtonWrapper = styled.button<{}>`
  border-radius: 10px;
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-grey);
  background: var(--x-light-grey);
  position: absolute;
  font-size: 30px;
  top: 0;
  left: 50%;
  pointer-events: all;
  transform: translate(-50%, -50%);
`;

export const CloseButtonWrapper = styled.button<{ css?: string }>`
  min-width: 35px;
  min-height: 35px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-grey);
  font-size: 25px;

  ${(props) => props.css}
`;

export const FloatableInputWrapper = styled.div<{
  float: boolean;
  focused: boolean;
  error?: boolean;
}>`
  border-bottom: 1px solid
    ${(props) =>
      props.error ? "red" : props.focused ? "var(--light-blue)" : "black"};
  position: relative;
  padding-bottom: 5px;

  label {
    position: absolute;
    top: ${(props) => (props.float ? "-17px" : "15px")};
    left: ${(props) => (props.float ? ".5rem" : "1rem")};
    font-size: ${(props) => (props.float ? ".8rem" : "1rem")};
    transition: all 0.2s;
    pointer-events: none;
    color: ${(props) =>
      props.error ? "red" : props.focused ? "var(--light-blue)" : "black"};
  }

  .error {
    color: red;
    font-size: 0.75rem;
    position: absolute;
    bottom: -5px;
    left: 1rem;
    transform: translateY(100%);
  }

  input {
    padding: 0.7rem 0.9rem;
    padding-bottom: 0.2rem;
    width: 100%;
    font-weight: bold;
  }

  input,
  input::-webkit-input-placeholder {
    font-family: "SamsungOne";
    font-size: 1rem;
    border: none;
    outline: none;
    background-color: transparent !important;
  }
`;

export const SelectInputWrapper = styled.div<{
  float: boolean;
  focused: boolean;
  error?: boolean;
}>`
  border-bottom: 1px solid
    ${(props) =>
      props.error ? "red" : props.focused ? "var(--light-blue)" : "black"};
  position: relative;
  padding-bottom: 5px;

  label {
    position: absolute;
    top: ${(props) => (props.float ? "-17px" : "15px")};
    left: ${(props) => (props.float ? ".5rem" : "1rem")};
    font-size: ${(props) => (props.float ? ".8rem" : "1rem")};
    transition: all 0.2s;
    pointer-events: none;
    color: ${(props) =>
      props.error ? "red" : props.focused ? "var(--light-blue)" : "black"};
    opacity: ${(props) => (props.float ? "1" : "0")};
  }

  .error {
    color: red;
    font-size: 0.75rem;
    position: absolute;
    bottom: -5px;
    left: 1rem;
    transform: translateY(100%);
  }

  select {
    padding: 0.7rem 0.9rem;
    padding-bottom: 0.2rem;
    width: 100%;
  }
`;

export const IconButton = styled.button`
  width: 3rem;
  height: 3rem;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const AudioButtonWrapper = styled.button`
  font-size: 2rem;
  pointer-events: all;
  width: max-content;
`;
