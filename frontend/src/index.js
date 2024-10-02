import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import { SearchProvider } from "./context/Searchcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        {/* <React.StrictMode> */}
          <App />
          <ToastContainer/>
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);
