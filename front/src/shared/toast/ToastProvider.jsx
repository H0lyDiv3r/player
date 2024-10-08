import { Box, Portal } from "@chakra-ui/react";
import { createContext, useReducer } from "react";
import { Toast } from "./Toast";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { useCallback } from "react";

export const ToastContext = createContext();

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
  const handleAddToast = useCallback((toastData) => {
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
  }, []);

  const handleRemoveToast = useCallback(() => {
    dispatch({
      type: updateToasts,
    });
  }, []);

  const containerRef = useRef(null);

  const vals = useMemo(() => ({ ...state, handleAddToast }), [state]);
  return (
    <ToastContext.Provider value={vals}>
      <Box
        height={"100vh"}
        width={"100%"}
        pos={"relative"}
        ref={containerRef}
        overflow={"hidden"}
      >
        {children}
        <Portal>
          <AnimatePresence>
            {state.toast && (
              <Toast
                data={state.toast}
                onClose={() => handleRemoveToast()}
                ref={containerRef}
              />
            )}
          </AnimatePresence>
        </Portal>
      </Box>
    </ToastContext.Provider>
  );
};
