import React from "react";

export type ButtonProps = {
  /**
   * Button contents
   */
  label?: string | React.ReactNode;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  variant?: "primary" | "secondary" | "blue" | "outline" | "orange";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large" | "largewidth" | "mediumwidth";
  className?: string;
  /**
   * 	
  Is this the principal call to action on the page?
   */
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  size = "small",
  className = "",
  isDisabled = false,
  type,
}) => {
  const buttonClassName = `transition-all button rounded-md font-bold disabled:opacity-20 inline-flex ${
    variant === "primary"
    ? "btnPrimary bg-blue-100 text-white hover-bg-blue-200 hover:shadow-secondary-100 disabled:hover:bg-blue-100 disabled:hover:shadow-none"
      : ""
  } ${
    variant === "secondary"
      ? "btnSecondary bg-green-200 text-white hover:bg-green-200 hover:shadow-green-200"
      : ""
  } ${
    variant === "blue"
      ? "btnblue bg-blue-300 text-white hover:bg-opacity-90 disabled:opacity-90 disabled:bg-blue-300 hover:shadow-secondary-100"
      : ""
  }${
    variant === "outline"
      ? "btnOutline border border-gray-100 bg-white text-secondary-100 disabled:opacity-20 disabled:border-gray-100 hover:shadow-secondary-100"
      : ""
  }${
    variant === "orange"
      ? "btnOutline border border-orange-300 bg-orange-300 text-white disabled:opacity-20 disabled:border-orange-300"
      : ""
  } ${size === "large" ? "text-500 px-6 py-3" : ""} ${
    size === "medium" ? "text-400 px-4 py-2.5" : ""
  }${size === "small" ? "text-400 px-4 py-2" : ""} ${
    size === "largewidth" ? "text-500 px-12 py-3" : ""
  }${size === "mediumwidth" ? "text-400 px-12 py-2.5" : ""} ${className} transition-all ease-in-out duration-200 hover:shadow-300 disabled:hover:shadow-none`;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
