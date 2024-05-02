import React, { useEffect, useState, useRef } from "react";
import Icons from "../Icons/Icon";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: "right" | "center" | "left";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  headerClassName?:string;
  bodyClassName?:string;
  footerClassName?:string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  placement = "center",
  size = "medium",
  children,
  className,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosed(true);
      onClose();
    }, 500);
  };

  useEffect(() => {
    if (isClosing && !isOpen) {
      const closeTimer = setTimeout(() => {
        setIsClosed(true);
      }, 500);
      return () => clearTimeout(closeTimer);
    }
  }, [isClosing, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (isClosed) {
    return null;
  }
  if (!isOpen) {
    return null;
  }
  const handleCrossIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleClose();
  };
  return (
    <div
      className={`fixed inset-0 w-full h-full flex z-[1000] 
      ${placement === "center" ? "items-center justify-center" : ""}
      ${placement === "right" ? "justify-end" : ""}
      ${className ? className : ""}
      `}
    >
      <div
        ref={backgroundRef}
        className="bg-black bg-opacity-50 absolute inset-0 w-full h-full"
        onClick={handleClose}
      ></div>      <div
        className={`sm:w-full bg-white max-w-[100%] overflow-auto relative shadow-100 z-20 flex flex-col transition-all duration-200 delay-200
        ${placement === "center" ? "rounded-md !max-w-[90%] max-h-[90%]" : "h-full max-h-[100%]"}
        ${size === "small" ? "md:w-[30rem]" : ""}
        ${size === "medium" ? "md:w-[85%]" : ""}
        ${size === "large" ? "md:w-[90rem]" : ""}
        ${isClosing ? "opacity-0" : ""}
        ${isClosing && placement === "center" ? "-translate-y-full" : ""}
        ${isClosing && placement === "right" ? "translate-x-full" : ""}
        ${isClosing && placement === "left" ? "-translate-x-full" : ""}
        `}
        // style={modalContentStyle}
      >
        <button
          title="close"
          type="button"
          onClick={handleCrossIconClick}
          className="absolute right-[1.5rem] top-4 p-4"
        >
          <Icons name="cross" variant="stroke" size={16} />
        </button>
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps {
  children: React.ReactNode;
  className?:string;
}
interface ModalFooterProps {
  children: React.ReactNode;
  className?:string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  return (
    <div className={`pt-6 min-h-[5rem] pb-5 px-8 border-b border-gray-100 flex justify-start items-center ${className ? className : ""}`}>{children}</div>
  );
};

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return <div className={`flex-grow overflow-auto p-8 ${className ? className : ""}`}>{children}</div>;
};

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return <div className={`pt-6 min-h-[5rem] pb-5 px-8 border-t border-gray-100 flex justify-start items-center ${className ? className : ""}`}>{children}</div>;
};
