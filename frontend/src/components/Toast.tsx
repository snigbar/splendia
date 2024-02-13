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
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed top-5 w-full mx-auto z-50">
      <div
        className={cn(
          "px-3 py-2 rounded-md bg-indigo-600 text-white max-w-sm mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
          {
            "bg-red-500": type === "error",
          }
        )}
      >
        <div className="flex justify-center items-center">
          <span className="font-semibold">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
