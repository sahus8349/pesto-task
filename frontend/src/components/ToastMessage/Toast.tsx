import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import styled from "styled-components";

const clrInfo = "#F15845";
const clrSuccess = "#2EB67D";
const clrWarning = "#ECB22E";
const clrError = "#E01E1E";

export const TostStyle = styled.div`
  .Toastify {
    .Toastify__toast--info {
      .Toastify__toast-icon {
        svg {
          path {
            fill: ${clrInfo};
          }
        }
      }
      .Toastify__progress-bar {
        background: ${clrInfo};
      }
    }
    .Toastify__toast--success {
      .Toastify__toast-icon {
        svg {
          path {
            fill: ${clrSuccess};
          }
        }
      }
      .Toastify__progress-bar {
        background: ${clrSuccess};
      }
    }
    .Toastify__toast--warning {
      .Toastify__toast-icon {
        svg {
          path {
            fill: ${clrWarning};
          }
        }
      }
      .Toastify__progress-bar {
        background: ${clrWarning};
      }
    }
    .Toastify__toast--error {
      .Toastify__toast-icon {
        svg {
          path {
            fill: ${clrError};
          }
        }
      }
      .Toastify__progress-bar {
        background: ${clrError};
      }
    }
  }
`;

export type ToastType = "info" | "success" | "warning" | "error";
export interface ToastMessagesProps {
  messages: string;
  type?: ToastType;
}

const ToastMessages: React.FC<ToastMessagesProps> = ({ messages, type }) => {
  toast(messages, { type });
  return (
    <>
      <TostStyle>
        <ToastContainer />
      </TostStyle>
    </>
  );
};

export default ToastMessages;
