import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Main style
import "./index.css";

import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
