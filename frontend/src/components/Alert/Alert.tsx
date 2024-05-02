import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
interface CustomAlertProps {
  title: string;
  message: string;
  type: "primary" | "secondary" | "success" | "danger" | "warning";
  confirmText: string;
  onConfirm: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

export class CustomAlert extends React.Component<CustomAlertProps> {
  static fire(props: CustomAlertProps) {
    const container = document.createElement("div");
    container.id = "custom-alert-container";
    document.body.appendChild(container);

    const close = () => {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
    };

    const handleConfirm = () => {
      props.onConfirm();
      close();
    };

    const handleCancel = () => {
      props.onCancel?.();
      close();
    };
    ReactDOM.render(
      <div className="fixed inset-0 w-full h-full flex items-center justify-center z-10">
        <div
          className="bg-black bg-opacity-50 absolute inset-0 w-full h-full"
          onClick={handleCancel}
        ></div>
        <div className="bg-white rounded-md w-[40rem] max-w-[90%] max-h-[90%] overflow-auto relative shadow-100 z-10">
          <button
            type="button"
            className="absolute right-4 top-4 p-4"
            onClick={handleCancel}
            title="close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.4058 3.65533C17.6986 3.36244 17.6986 2.88756 17.4058 2.59467C17.1129 2.30178 16.638 2.30178 16.3451 2.59467L10.0001 8.93967L3.65509 2.59467C3.36219 2.30178 2.88732 2.30178 2.59443 2.59467C2.30153 2.88756 2.30153 3.36244 2.59443 3.65533L8.93943 10.0003L2.59443 16.3453C2.30153 16.6382 2.30153 17.1131 2.59443 17.406C2.88732 17.6989 3.36219 17.6989 3.65509 17.406L10.0001 11.061L16.3451 17.406C16.638 17.6989 17.1129 17.6989 17.4058 17.406C17.6986 17.1131 17.6986 16.6382 17.4058 16.3453L11.0607 10.0003L17.4058 3.65533Z"
                fill="#232323"
              />
            </svg>
          </button>
          <div className="p-10 pb-0">
            <h3 className="mb-2 font-bold text-700">{props.title}</h3>
            <div
              className="text-500 text-gray-700 min-h-[8.375rem] max-w-lg"
              dangerouslySetInnerHTML={{ __html: props.message }}
            ></div>
          </div>
          <div className="px-10 py-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-200">
            <Button
              label={props.cancelText ? props.cancelText : "Cancel"}
              onClick={handleCancel}
              variant="outline"
            />
            <Button
              label={props.confirmText}
              onClick={handleConfirm}
              variant="primary"
            />
          </div>
        </div>
      </div>,
      container,
    );
  }

  render() {
    return null;
  }
}

interface AlertProps {
  type?: "primary" | "secondary" | "success" | "danger" | "warning";
}

const Alert: React.FC<AlertProps> = ({ type = "primary" }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleButtonClick = () => {
    CustomAlert.fire({
      title: "Are you sure want to delete team?",
      message:
        "The employees added to this team will be removed. This actions cannot be undone ",
      type: type,
      confirmText: "Yes, I am sure",
      onConfirm: () => {
        console.log("Confirm button clicked");
      },
      cancelText: "Cancel",
      onCancel: () => {
        console.log("Cancel button clicked");
      },
    });

    setAlertVisible(true);
  };

  return (
    <div>
      {/* <button onClick={handleButtonClick} disabled={alertVisible}>
        Open Alert
      </button> */}
      <button onClick={handleButtonClick}>Open Alert</button>
    </div>
  );
};

export default Alert;
