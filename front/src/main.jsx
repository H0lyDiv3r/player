import React from "react";
import ReactDOM from "react-dom/client";
import "./html.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/rubik/900.css";
import "@fontsource/rubik/800.css";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/300.css";

import { theme } from "./themes/theme.js";
import { GlobalContextProvider } from "./store/GlobalContextProvider.jsx";
import { ToastProvider } from "./shared/toast/ToastProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GlobalContextProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </GlobalContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
