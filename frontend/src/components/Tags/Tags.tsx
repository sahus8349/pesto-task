import React from "react";

export interface TagProps {
  type: "default" | "primary" | "success" | "secondary" | "blue" | "cross";
  text: React.ReactNode;
  onRemove?: () => void;
  className?: string;
  showCross?: boolean;
  key?: any;
}

const Tag: React.FC<TagProps> = ({ text, showCross, type, onRemove, key }) => {
  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div
      key={key}
      className={`tag inline-block text-200 px-3 py-1 rounded-2xl font-medium
      ${type === "default" ? "bg-gray-400 text-gray-500" : ""}
      ${type === "primary" ? "bg-gray-600 text-primary-100" : ""}
      ${type === "success" ? "bg-pastel-100 text-green-100" : ""}
      ${type === "secondary" ? "bg-pastel-200 text-secondary-100" : ""}
      ${type === "blue" ? "bg-pastel-300 text-blue-100" : ""}
      ${
        type === "cross"
          ? "rounded-md py-2 text-400 bg-gray-400 text-gray-300 inline-flex items-center gap-2 cursor-pointer"
          : ""
      }
      `}
    >
      <span className="tag-text">{text}</span>
      {showCross && (
        <span className="cross-icon" onClick={handleRemoveClick}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.96816 2.09283C9.26106 1.79994 9.26106 1.32506 8.96816 1.03217C8.67527 0.739277 8.2004 0.739277 7.9075 1.03217L5.00017 3.93951L2.09283 1.03217C1.79994 0.739277 1.32506 0.739277 1.03217 1.03217C0.739277 1.32506 0.739277 1.79994 1.03217 2.09283L3.93951 5.00017L1.03217 7.9075C0.739277 8.2004 0.739277 8.67527 1.03217 8.96816C1.32506 9.26105 1.79994 9.26105 2.09283 8.96816L5.00017 6.06083L7.9075 8.96816C8.2004 9.26105 8.67527 9.26105 8.96816 8.96816C9.26106 8.67527 9.26106 8.2004 8.96816 7.9075L6.06083 5.00017L8.96816 2.09283Z"
              fill="#888888"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default Tag;
