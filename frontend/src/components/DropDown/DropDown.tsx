import React from "react";
import Select, {
  Props as ActionMeta,
  SingleValue,
  MultiValue,
} from "react-select";

export type SelectOption = {
  label: string;
  value: string | number;
};

export type DropdownProps = {
  placeholder ?:any;
  options: SelectOption[];
  isMulti?: boolean;
  onChange: (
    value: SelectOption | SelectOption[] | null,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  className?: string;
  type?: "circle" | "box" | "smallBox";
  menuPlacement?: "top" | "bottom";
  name?: string;
  defaultValue?: SelectOption | SelectOption[] | null;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerClassName?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  id?: string;
  size?: string;
};

export type SelectChangeHandler = (
  newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
  actionMeta: ActionMeta<SelectOption>,
) => void;

export const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  isMulti = false,
  onChange,
  className,
  type,
  menuPlacement,
  name,
  defaultValue,
  disabled,
  error,
  errorMessage,
  containerClassName,
  id,
  isClearable = true,
  isSearchable = true,
  isLoading = false,
  size,
}) => {
  const handleChange: SelectChangeHandler = (newValue, actionMeta) => {
    onChange(newValue as SelectOption | SelectOption[] | null, actionMeta);
  };

  // const handleChange: SelectChangeHandler = (newValue, actionMeta) => {
  //   let value: SelectOption | SelectOption[] | null = null;

  //   if (newValue !== null) {
  //     if (Array.isArray(newValue)) {
  //       value = newValue.map((option) => option.value);
  //     } else {
  //       value = newValue.value;
  //     }
  //   }

  //   onChange(value, actionMeta);
  // };
  /*
  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8745 3.61562C10.7071 3.46146 10.4358 3.46146 10.2684 3.61562L6 7.54702L1.73162 3.61562C1.56425 3.46146 1.29289 3.46146 1.12552 3.61562C0.958158 3.76977 0.958158 4.0197 1.12552 4.17386L5.69695 8.38438C5.77733 8.45841 5.88633 8.5 6 8.5C6.11366 8.5 6.22267 8.45841 6.30305 8.38438L10.8745 4.17386C11.0418 4.0197 11.0418 3.76977 10.8745 3.61562Z" fill="#232323" />
        </svg>
      </components.DropdownIndicator>
    );
  };
  */

  return (
    <div
      className={`select inline-block w-full ${
        type === "box" ? "!block" : ""
      } ${containerClassName ? containerClassName : ""} ${
        error ? "error" : ""
      } `}
    >
      <Select
        unstyled
        isDisabled={disabled}
        defaultValue={defaultValue}
        placeholder={isLoading?<Spinner />:placeholder}
        name={name}
        isMulti={isMulti}
        options={options}
        onChange={handleChange}
        className={`inline-block w-full ${type === "box" ? "!block" : ""} ${
          error
            ? "rounded-b-none border-primary-100 focus:border-primary-100 focus:shadow-0"
            : ""
        } ${size === "sm" ? "!py-2 !text-200" : ""} ${className ? className : ""}`}
        classNamePrefix="select"
        menuPlacement={menuPlacement}
        classNames={{
          input: () => "py-2",
          control: (
            state,
          ) => ` ${disabled?"bg-gray-200":"bg-white"} px-3 rounded-md border border-gray-100 text-400 text-gray-300 focus-within:border-secondary-100 focus-within:shadow-200
          ${
            type === "box"
              ? "rounded-md py-1 text-400 text-gray-300"
              : ""
          } 
          ${
            type === "smallBox"
              ? "rounded-md text-300 text-gray-300"
              : ""
          } 
          ${state.isFocused ? "" : ""} ${state.menuIsOpen ? "" : ""}`,
          placeholder: () => "!text-gray-700",
          dropdownIndicator: () =>
            "text-gray-300 pl-1 py-0.5 [&>svg]:opacity-0 bg-down bg-[length:1rem_1rem] bg-no-repeat bg-center",
          menu: () =>
            "bg-white border text-400 border-gray-100 rounded-md rounded-t-0 mt-1 shadow-100 min-w-[6rem]",
          option: ({
            isFocused,
            isSelected,
          }) => `px-3 py-2 relative text-400 text-gray-300 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-300 first:hover:rounded-t-md last:hover:rounded-b-md
          ${
            isSelected
              ? "bg-gray-200 text-gray-300 hover:bg-gray-200 hover:text-gray-300 active:bg-gray-300 active:text-gray-300 first:rounded-t-md last:rounded-b-md first:hover:rounded-t-md last:hover:rounded-b-md after:ml-2 after:absolute after:right-2 after:content-['']"
              : ""
          }
          ${isFocused ? "bg-gray-200 text-gray-300 hover:bg-gray-200 first:rounded-t-md last:rounded-b-md first:hover:rounded-t-md last:hover:rounded-b-md" : ""} 
          `,
          noOptionsMessage: () =>
            "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm",
        }}
        // after:content-['✔']
        // components={{ DropdownIndicator }}
        isSearchable={isSearchable}
        // menuIsOpen
        isClearable={isClearable}
        id={`${id ? id : ""}`}
      />
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

const Spinner = () => {
  return (
    <div className="flex">
      <div>Loading...</div>
      <div className="ms-auto">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
