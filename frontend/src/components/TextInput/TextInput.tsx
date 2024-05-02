import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Icons from "../Icons/Icon";

import styled from "styled-components";

export const InputStyle = styled.div`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

export type TextInputProps = {
  placeholder?: string;
  size?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultValue?: string | number;
  className?: string;
  containerClassName?: string;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  // type?: "text" | "number" | "email" | "password" | "time" | "datetime-local";
  icon?: boolean;
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyUp?: any;
  onClick?: () => void;
  name?: string;
  id?: string;
  accept?:string;
};

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  disabled = false,
  error = false,
  errorMessage = "",
  onChange,
  value,
  defaultValue,
  className,
  containerClassName,
  onKeyPress,
  type,
  icon,
  onFocus,
  onBlur,
  onKeyUp,
  onClick,
  readOnly = false,
  size,
  name,
  id,
  accept,
}) => {
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   onChange(event.target.value);
  // };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type || "text");

  const handlePassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const handleClick = () => {
    if(onClick){
      onClick();
    }
  };
  
  return (
    <InputStyle
      className={`input-container relative ${
        containerClassName ? containerClassName : ""
      } ${error ? "error" : ""}`}
    >
      <input
        type={inputType}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        defaultValue={defaultValue}
        accept={accept}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={(event) => {
          if (onBlur) onBlur(event);
        }}
        onClick={handleClick}
        className={`outline-none text-400 w-full bg-white border border-gray-100 px-4 py-3 font-normal rounded-md text-gray-300 placeholder:text-gray-700 
          focus:border-secondary-100 focus:shadow-200
          disabled:bg-gray-200 read-only:!shadow-0 read-only:!border-gray-100
          ${icon ? "pr-10" : ""} 
          ${
            error
              ? "rounded-b-none border-primary-100 focus:border-primary-100 focus:shadow-0"
              : ""
          }
          ${size === "sm" ? "!py-2 !px-3 !text-200" : ""}
          ${className ? className : ""}
          `}
        readOnly={readOnly}
        id={`${id ? id : ""}`}
      />
      {icon && (
        <button
          type="button"
          className="absolute top-2/4 -translate-y-2/4 right-3 outline-none"
          onClick={handlePassword}
        >
          {showPassword ? <Icons name="hide" /> : <Icons name="show" />}
        </button>
      )}

      {error && (
        <div className="icon-container bg-primary-100 flex items-center gap-2 py-3 px-4 text-white text-400 rounded-b-md">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 9V14"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.9999 21.41H5.93993C2.46993 21.41 1.01993 18.93 2.69993 15.9L5.81993 10.28L8.75993 5.00003C10.5399 1.79003 13.4599 1.79003 15.2399 5.00003L18.1799 10.29L21.2999 15.91C22.9799 18.94 21.5199 21.42 18.0599 21.42H11.9999V21.41Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.9946 17H12.0036"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {error && <div className="error">{errorMessage}</div>}
        </div>
      )}
    </InputStyle>
  );
};

export default TextInput;
