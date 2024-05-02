import React from "react";

export type RadioButtonProps = {
  label?: string;
  size?: string;
  value?: string;
  name: string;
  selectedValue?: string | boolean;
  onChange: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  selectedValue,
  onChange,
  name,
  size,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="inline-block">
      <label className="flex gap-3 items-center">
        <input
          type="radio"
          value={value}
          name={name}
          checked={selectedValue == value}
          onChange={handleInputChange}
          className={`relative appearance-none rounded-full border border-gray-100 peer bg-white
           checked:border-blue-100 ${
             size === "sm"
               ? "w-4 h-4 checked:border-[0.25rem]"
               : "w-6 h-6 checked:border-[0.3125rem]"
           }`}
        />
        {label ? <span className="text-500">{label}</span> : null}
      </label>
    </div>
  );
};

export default RadioButton;
