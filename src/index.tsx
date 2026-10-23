import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "shared/config/i18n/i18n";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
