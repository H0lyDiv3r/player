import { Box } from "@chakra-ui/react";
import { createContext, useReducer } from "react";
import { Toast } from "./Toast";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";

export const ToastContext = createContext();
// sample toast
// {
// id:id
// state: success,fail,info,warn
// message: message
// delay: time
// }
const initialState = {
  toast: null,
};

const addToast = "ADD_TOAST";
const updateToasts = "UPDATE_TOASTS";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case addToast:
      return { ...state, toast: action.payload.toast };
    case updateToasts:
      return { ...state, toast: null };
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleAddToast = (toastData) => {
    const toast = {
      id: new Date().valueOf(),
      status: toastData.status,
      message: toastData.message,
      delay: toastData.delay,
    };
    dispatch({
      type: addToast,
      payload: {
        toast: toast,
      },
    });
  };

  const handleRemoveToast = () => {
    dispatch({
      type: updateToasts,
    });
    console.log(state.toast);
  };

  const containerRef = useRef(null);

  const vals = { ...state, handleAddToast };
  return (
    <ToastContext.Provider value={vals}>
      <Box height={"100vh"} width={"100%"} pos={"relative"} ref={containerRef}>
        {children}
        <AnimatePresence>
          {state.toast && (
            <Toast
              data={state.toast}
              onClose={() => handleRemoveToast()}
              ref={containerRef}
            />
          )}
        </AnimatePresence>
      </Box>
    </ToastContext.Provider>
  );
};
