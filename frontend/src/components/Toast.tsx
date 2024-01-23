import { useEffect } from "react";
import { TToast } from "../interfaces/interfaces";
import cn from "../lib/cn";

const Toast = ({
  message,
  type,
  onClose,
}: { onClose: () => void } & TToast) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md",
        { "bg-red-500": type === "error" }
      )}
    >
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
