import React from "react";
import { createRoot } from "react-dom/client";
import Typography from "../Typography/Typography";
import ToastMessages from "../ToastMessage/Toast";
import Button from "../Button/Button";
import ecoLogo from "../../assets/react.svg";
import { Modal, ModalBody } from "../Modal/Modal";
import Loader from "../Loader/Loader";

export const Error404 = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-600 items-center">
      <div className="pt-12">
        <img
          src={ecoLogo}
          alt="logo"
          className="w-auto max-w-full h-[8rem] object-cover object-left-top"
        />
      </div>
      <div className="h-full grid justify-items-center items-center">
        <section className="text-center">
          <Typography className="font-bold mb-2" variant="h2">
            Error 404
          </Typography>
          <div className="tip-wrapper">
            <Typography className="my-5" variant="h4">
              Page Not Found
            </Typography>
            <Button
              label="Refresh"
              variant="primary"
              type="button"
              size="large"
              onClick={()=>{window.location.reload()}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export const Error500 = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-600 items-center">
      <div className="pt-12">
        <img
          src={ecoLogo}
          alt="logo"
          className="w-auto max-w-full h-[8rem] object-cover object-left-top"
        />
      </div>
      <div className="h-full grid justify-items-center items-center">
        <section className="text-center">
          <Typography className="font-bold mb-2" variant="h2">
            Error 500
          </Typography>
          <div className="tip-wrapper">
            <Typography className="my-5" variant="h4">
              Something went wrong!
            </Typography>
            <Button
              label="Refresh"
              variant="primary"
              type="button"
              size="large"
              onClick={()=>window.location.reload()}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

interface EmptyProps {
  heading: string;
  subHeading?: string;
  btnTitle?: string;
  btnAction?: any;
}

export const EmptyData = ({
  heading,
  subHeading,
  btnTitle,
  btnAction,
}: EmptyProps) => {
  return (
    <>
      <section className="empty-main text-center p-20">
        <div className="EmptyDatadiv">
          <Typography className="py-2" variant="h1">
            {heading}
          </Typography>
          {subHeading && (
            <Typography className="py-2" variant="h3">
              {subHeading}
            </Typography>
          )}
          {btnTitle?
            <Button 
              label={btnTitle}
              size="small"
              variant="outline"
              onClick={()=>{
                if(btnAction !== undefined){
                  btnAction()
                }
              }}
            />
          :""}
        </div>
      </section>
    </>
  );
};

export const ErrorAPI500 = () => {
  return (
    <>
      <div className="mt-20 text-center">
        <Typography variant="h5">Something went wrong!</Typography>
      </div>
    </>
  );
};

type ToastType = "info" | "success" | "warning" | "error";

interface ShowToastProps {
  variant: ToastType;
  message: string;
  onClose?:any;
}

export class ShowToast extends React.Component<ShowToastProps> {
  static fire(props: ShowToastProps) {
    const random = Math.random();
    const container = document.createElement("div");
    container.id = "custom-alert-container-"+props.message.split(' ').join('_')+"_"+random;
    const root = createRoot(container);
    document.body.appendChild(container);

    const close = () => {
      root.unmount();
      container.remove();
      return false;
    };

    setTimeout(()=>{
      close();
    },7000);

    root.render(
      <ToastMessages messages={props.message} type={props.variant} />,
    );
  }

  render() {
    return null;
  }
}

export class ShowLoader extends React.Component {
  static fire() {
    const container = document.createElement("div");
    container.id = "custom-loader-container";
    const root = createRoot(container);
    document.body.appendChild(container);

    root.render(<Loader />);
  }

  static close() {
    const container = document.getElementById("custom-loader-container");
    if (container !== undefined && container !== null) {
      const root = createRoot(container);
      root.unmount();
      container.remove();
    }

    return false;
  }

  render() {
    return null;
  }
}

export class ShowAlert extends React.Component<ShowToastProps> {
  static fire(props: ShowToastProps) {
    const random = Math.random();
    const container = document.createElement("div");
    container.id = "custom-alert-container-"+props.message.split(' ').join('_')+"_"+random;
    const root = createRoot(container);
    document.body.appendChild(container);

    const close = () => {
      root.unmount();
      container.remove();
      return false;
    };

    setTimeout(()=>{
      close();
    },7000);

    root.render(
      <Alert messages={props.message} type={props.variant} onClose={close} />,
    );
  }

  render() {
    return null;
  }
}

const Alert = (props:any) => {
  return (
    <Modal
          isOpen
          onClose={props.onClose}
          size="small"
          placement="center"
        >
          <ModalBody>
            <div className="grid grid-cols-1">
              <div className="flex justify-center content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#c8e6c9" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path>
                    <polyline fill="none" stroke="#4caf50" stroke-miterlimit="10" stroke-width="4" points="14,24 21,31 36,16"></polyline>
                  </svg>
                </div>
                <Typography className="my-5 text-green-100 text-center" variant="h4">
                  {props.messages}
                </Typography>
            </div>
          </ModalBody>
        </Modal>
  );
}
