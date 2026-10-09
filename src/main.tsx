import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { JatekProvider } from "./contexts/JatekContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JatekProvider>
      <App />
    </JatekProvider>
  </StrictMode>,
);
