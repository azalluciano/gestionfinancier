import React, { useEffect } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning" | "default";

interface ToastMessageProps {
  message: string;
  type?: ToastType;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  type = "default",
}) => {
  useEffect(() => {
    const options: ToastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warning":
        toast.warning(message, options);
        break;
      default:
        toast(message, options);
    }
  }, [message, type]);

  return <ToastContainer />;
};

export default ToastMessage;
