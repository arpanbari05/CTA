import React, { FC, useEffect, useState, useRef } from "react";
import {
  AudioButtonWrapper,
  ButtonWrapper,
  CloseButtonWrapper,
  FloatableInputWrapper,
  SelectInputWrapper,
  SelectSearchableInputWrapper,
  ToastWrapper,
  ToggleButtonWrapper,
} from "../styles";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { IoMdClose, IoIosCheckmarkCircle } from "react-icons/io";
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { StoreType } from "../types/store.types";
import { Spinner } from "react-bootstrap";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useOnClickOutside } from "../customHooks";

export const Button: FC<{
  primary?: boolean;
  secondary?: boolean;
  onClick?: (e?: any) => void;
  styledCss?: string;
  active?: boolean;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
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
  isLoading,
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
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Spinner size="sm" color="white" animation="border" />
      ) : (
        children
      )}
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
  onClick?: () => void;
  styledCss?: string;
  disabled?: boolean | null;
  className?: string;
  id?: string;
}> = ({ onClick, styledCss, disabled, className, id }) => {
  return (
    <CloseButtonWrapper
      disabled={Boolean(disabled)}
      css={styledCss}
      onClick={onClick}
      className={`button ${className}`}
      id={id}
    >
      <IoMdClose />
    </CloseButtonWrapper>
  );
};

export const FloatableInput: FC<{
  placeholder: string;
  register?: any;
  type: "text" | "email" | "number" | "search";
  error?: string | any;
  onChange?: (e: any) => void;
  maxLength?: number;
  value?: string;
  focused?: boolean;
}> = (props) => {
  const {
    placeholder,
    register,
    type = "text",
    error,
    onChange,
    maxLength,
  } = props;
  const [focused, setFocused] = useState(Boolean(props.focused));
  const [value, setValue] = useState<string>(props.value || "");

  useEffect(() => {
    if (typeof props.value === "string") {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    setFocused(Boolean(props.focused));
  }, [props.focused]);

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
        value={value}
        {...register}
      />
      {error && <div className="error">{error} </div>}
    </FloatableInputWrapper>
  );
};

export const SelectInput: FC<{
  placeholder: string;
  register: any;
  options: string[] | StoreType[];
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
      onChange={(e: any) => {
        onChange && onChange(e);
        setValue(e.target.value);
      }}
    >
      <label>{placeholder}</label>
      <select
        placeholder={placeholder}
        onClick={() => setFocused((prev) => !prev)}
        onBlur={() => setFocused(false)}
        {...register}
      >
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option
              key={opt["ACTUAL CLIENT STORE ID"]}
              value={opt["ACTUAL CLIENT STORE ID"]}
            >
              {opt["BUSINESS / BRAND NAME"]}
            </option>
          )
        )}
      </select>
      {error && <div className="error">{error} </div>}
    </SelectInputWrapper>
  );
};

export const SelectSearchableInput: FC<{
  placeholder: string;
  options: string[] | StoreType[];
  onChange?: (e: any) => void;
  form?: UseFormReturn<FieldValues>;
  looseFocusCallback?: () => void;
  setShouldInitializeStore: (arg: boolean) => void;
  shouldInitializeStore: boolean;
}> = (props) => {
  const {
    placeholder,
    options,
    onChange,
    form,
    looseFocusCallback,
    shouldInitializeStore,
    setShouldInitializeStore,
  } = props;
  const setFormValue = form?.setValue;
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setFocused(false);
    if (typeof selectedOption !== "string" && selectedOption) {
      setValue(
        `${selectedOption["BUSINESS / BRAND NAME"]} - ${selectedOption.LOCALITY}`
      );
      setFormValue &&
        setFormValue("store", selectedOption["ACTUAL CLIENT STORE ID"]);
    }
    looseFocusCallback && looseFocusCallback();
  });

  useEffect(() => {
    if (options.length > 0 && shouldInitializeStore) {
      const value = options[0];
      if (typeof value !== "string") {
        setValue(`${value["BUSINESS / BRAND NAME"]} - ${value.LOCALITY}`);
        setSelectedOption(value);
        setFormValue && setFormValue("store", value["ACTUAL CLIENT STORE ID"]);
        setShouldInitializeStore(false);
      }
    }
  }, [
    options,
    setValue,
    setFormValue,
    shouldInitializeStore,
    setShouldInitializeStore,
  ]);

  const handleOptionClick = (e: React.MouseEvent, value: StoreType) => {
    e.stopPropagation();
    setValue(`${value["BUSINESS / BRAND NAME"]} - ${value.LOCALITY}`);
    setSelectedOption(value);
    setFormValue && setFormValue("store", value["ACTUAL CLIENT STORE ID"]);
    setFocused(false);
    looseFocusCallback && looseFocusCallback();
  };

  return (
    <SelectSearchableInputWrapper
      ref={ref}
      onClick={() => {
        setFocused((prev) => !prev);
        if (!focused) {
          setValue("");
        } else {
          if (typeof selectedOption !== "string") {
            setValue(
              `${selectedOption["BUSINESS / BRAND NAME"]} - ${selectedOption.LOCALITY}`
            );
            setFormValue &&
              setFormValue("store", selectedOption["ACTUAL CLIENT STORE ID"]);
          }
          looseFocusCallback && looseFocusCallback();
        }
      }}
    >
      <FloatableInput
        placeholder={placeholder}
        type="search"
        value={value}
        focused={focused}
        onChange={onChange}
      />
      <button className="dropdown-icon">
        <FaChevronDown size={11} />
      </button>
      {focused && (
        <div className="options-container">
          {options.map(
            (opt) =>
              typeof opt !== "string" && (
                <button
                  type="button"
                  onClick={(e) => handleOptionClick(e, opt)}
                  className={`option`}
                >
                  {opt["BUSINESS / BRAND NAME"]} - {opt.LOCALITY}
                </button>
              )
          )}
        </div>
      )}
    </SelectSearchableInputWrapper>
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

export const Toast: FC<{
  show: boolean;
  onClose: () => void;
  message: string;
}> = (props) => {
  const { show, onClose, message } = props;

  useEffect(() => {
    if (!show) return;

    const timeout = setTimeout(() => {
      onClose();
    }, 8000);

    return () => clearTimeout(timeout);
  }, [onClose, show]);

  return (
    <ToastWrapper show={show}>
      <div className="d-flex align-items-center gap-2">
        <div className="icon-wrapper" style={{ background: "#45bb64" }}>
          <IoIosCheckmarkCircle size={25} color="white" />
        </div>
        <small>{message}</small>
      </div>
      <button className="close-button" onClick={onClose}>
        <IoMdClose size={14} />
      </button>
    </ToastWrapper>
  );
};
