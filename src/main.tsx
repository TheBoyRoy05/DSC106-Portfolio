import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./Styles/fonts.css";
import "./Styles/index.css";
import "./Styles/animations.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={"/DSC106-Portfolio/"}>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
