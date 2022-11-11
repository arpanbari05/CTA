import React, { FC, useState } from "react";
import {
  AudioButtonWrapper,
  ButtonWrapper,
  CloseButtonWrapper,
  FloatableInputWrapper,
  SelectInputWrapper,
  ToggleButtonWrapper,
} from "../styles";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { State } from "../types/location.types";
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri";

export const Button: FC<{
  primary?: boolean;
  secondary?: boolean;
  onClick?: (e?: any) => void;
  styledCss?: string;
  active?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button";
}> = ({
  primary = false,
  secondary = false,
  children,
  onClick = () => {},
  styledCss = "",
  active = false,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      primary={primary}
      secondary={secondary}
      css={styledCss}
      active={active}
      className={`button ${className}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </ButtonWrapper>
  );
};

export const ToggleButton: FC<{
  onClick: () => void;
  open: boolean;
  className?: string;
}> = ({ onClick, open, children, className }) => {
  return (
    <ToggleButtonWrapper className={className} onClick={onClick}>
      {open ? (
        <HiOutlineChevronDown size={23} />
      ) : (
        <HiOutlineChevronUp size={23} />
      )}
      {children}
    </ToggleButtonWrapper>
  );
};

export const NavigationLink: FC<{
  onClick?: () => void;
  className?: string;
  styles?: React.CSSProperties;
  textShadow?: boolean;
}> = ({ onClick, children = <></>, className, styles, textShadow = true }) => {
  return (
    <button
      style={{
        color: "currentColor",
        fontWeight: "bold",
        display: "flex",
        fontSize: "1.2rem",
        textDecoration: "underline",
        textShadow: textShadow ? "1px 2px 3px rgba(0,0,0,.3)" : "unset",
        ...styles,
      }}
      className={`gap-1 align-items-center justify-content-center underline ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const CloseButton: FC<{
  onClick: () => void;
  styledCss?: string;
  disabled?: boolean | null;
  className?: string;
  id?: string;
}> = ({ onClick, styledCss, disabled, className, id }) => {
  return (
    <CloseButtonWrapper
      disabled={Boolean(disabled)}
      css={styledCss}
      className={`button ${className}`}
      id={id}
    >
      <IoMdClose />
    </CloseButtonWrapper>
  );
};

export const FloatableInput: FC<{
  placeholder: string;
  register: any;
  type: "text" | "email" | "number";
  error?: string | any;
  onChange?: (e: any) => void;
  maxLength: number;
}> = (props) => {
  const {
    placeholder,
    register,
    type = "text",
    error,
    onChange,
    maxLength,
  } = props;
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <FloatableInputWrapper
      float={focused || Boolean(value)}
      focused={focused}
      error={Boolean(error)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(e: any) => {
        onChange && onChange(e);
        setValue(e.target.value);
      }}
    >
      <label>{placeholder}</label>
      <input
        maxLength={maxLength}
        autoComplete="off"
        type={type}
        {...register}
      />
      {error && <div className="error">{error} </div>}
    </FloatableInputWrapper>
  );
};

export const SelectInput: FC<{
  placeholder: string;
  register: any;
  options: string[] | State[];
  error?: string | any;
  onChange?: (e: any) => void;
}> = (props) => {
  const { placeholder, register, options, error, onChange } = props;
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <SelectInputWrapper
      float={focused || Boolean(value)}
      focused={focused}
      error={Boolean(error)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(e: any) => {
        onChange && onChange(e);
        setValue(e.target.value);
      }}
    >
      <label>{placeholder}</label>
      <select defaultValue={null} placeholder={placeholder} {...register}>
        <option value={""}>{placeholder}</option>
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.name} value={opt.name}>
              {opt.name}
            </option>
          )
        )}
      </select>
      {error && <div className="error">{error} </div>}
    </SelectInputWrapper>
  );
};

export const AudioButton: FC<{
  state: string;
  onClick: () => void;
  className?: string;
}> = (props) => {
  const { state, onClick, className } = props;

  return (
    <AudioButtonWrapper className={className} onClick={onClick}>
      {state === "STARTED" ? (
        <RiVolumeUpFill color="white" />
      ) : (
        <RiVolumeMuteFill color="white" />
      )}
    </AudioButtonWrapper>
  );
};
