import React from "react";
import CustomLoader from "./CustomLoader";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  className,
}) => {
  return (
    <div
      className={`fixed z-50 w-full h-full inset-0 flex items-center justify-center ${
        className ? className : ""
      }`}
    >
      <CustomLoader />
    </div>
  );
};

export default Loader;
