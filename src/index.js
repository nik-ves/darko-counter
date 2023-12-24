import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SupabaseContextProvider from "./context/supabase-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SupabaseContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SupabaseContextProvider>
);
