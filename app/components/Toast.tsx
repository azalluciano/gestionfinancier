// Toast.tsx
import React, { useState, useEffect } from "react";

// Types pour notre toast
export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Disparaît automatiquement après 3 secondes
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  // Classes CSS selon le type de toast
  const toastClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`${toastClasses[type]} text-white p-3 rounded shadow-md flex justify-between items-center`}
      style={{ minWidth: "250px", maxWidth: "350px" }}
    >
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 text-white font-bold"
        aria-label="Fermer"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
