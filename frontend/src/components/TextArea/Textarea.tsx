import React, { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";

export type TextareaProps = {
  size?: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  containerClassName?: string;
  onKeyPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  placeholder: string;
  disabled?: boolean;
  value: string;
  resize?: boolean;
  counter?: boolean;
  maxCharacters?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  error = false,
  errorMessage = "",
  className,
  containerClassName,
  onKeyPress,
  onFocus,
  onBlur,
  readOnly = false,
  size,
  id,
  placeholder,
  disabled = false,
  value,
  name,
  onChange,
  resize = false,
  maxCharacters,
  counter,
}) => {
  const [characterCount, setCharacterCount] = useState(value?.length || 0);

  useEffect(() => {
    setCharacterCount(value?.length || 0);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    if (maxCharacters && newValue.length > maxCharacters) {
      return;
    }
    onChange(event);
    setCharacterCount(newValue.length);
  };

  return (
    <div
      className={`input-container relative ${
        containerClassName ? containerClassName : ""
      } ${error ? "error" : ""}`}
    >
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        defaultValue={value}
        onKeyPress={onKeyPress}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          //if (onBlur) onBlur();
        }}
        className={`outline-none w-full bg-white border border-gray-100 px-4 py-3 text-500 font-normal rounded-md text-gray-300 placeholder:text-gray-700 
          focus:border-secondary-100 focus:shadow-200
          disabled:bg-gray-200 h-28 read-only:!shadow-0 read-only:!border-gray-100
          ${counter ? "pb-8 " : ""}
          ${resize ? "resize-none" : ""}
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
      {counter ? (
        <span className={`absolute right-2 bottom-2 text-200 p-1 bg-white`}>
          Count : {characterCount}
        </span>
      ) : null}
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
    </div>
  );
};

export default Textarea;
