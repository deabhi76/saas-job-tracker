import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import AuthInitializer
from "./components/Common/AuthInitializer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <AuthProvider>
         <AuthInitializer>

          <App />

        </AuthInitializer>
      </AuthProvider>
  </React.StrictMode>
);