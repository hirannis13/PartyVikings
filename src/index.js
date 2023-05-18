import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import "./index.css";
import { SnackbarProvider } from "./components/utils/SnackBarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
