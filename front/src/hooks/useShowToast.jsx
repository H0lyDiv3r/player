import { useContext } from "react";
import { ToastContext } from "../shared/toast/ToastProvider";

export const useShowToast = () => {
  const { handleAddToast } = useContext(ToastContext);
  const showToast = (status, message, delay = 3000) => {
    handleAddToast({ status, message, delay });
  };
  return [showToast];
};
