import React, { ChangeEvent } from "react";
import TextInput from "../TextInput/TextInput";

export type InputWithIconProps = {
  name: string;
  value: string;
  placeholder?: string;
  type:string;
  size?:string;
  onChange: (value: string) => void;
  onClick?: () => void;
  icon?: string;
  position?: "before" | "after";
  className?: string;
  disabled?:boolean;
  readOnly?:boolean;
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
  name,
  value,
  placeholder,
  type,
  size,
  onChange,
  onClick,
  icon,
  position,
  className,
  disabled,
  readOnly,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={`relative ${position === "before" ? "" : ""} ${
        position === "after" ? "" : ""
      } ${className ? className : ""}`}
    >
      <TextInput
        type={type}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        className={`${position === "before" ? "pl-10" : ""} ${
          position === "after" ? "pr-10" : ""
        } ${size === "sm" ? "!py-2 !pe-3 !text-200" : ""}`}
        disabled={disabled}
        readOnly={readOnly}
      />
      {/* <input type="text" value={value} onChange={handleChange} className="input-text" /> */}
      {position === "before" && icon && (
        <div className="icon-before absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      {position === "after" && icon && (
        <div className="icon-after absolute right-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  );
};

export default InputWithIcon;
