import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// 1. Get a reference to the container element in your HTML
const container = document.getElementById("root");

// 2. Check if the container actually exists before trying to use it
if (container) {
  // 3. Create a root and render your app
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Optional: Log an error if the root element isn't found
  console.error(
    "Fatal error: The root element with ID 'root' was not found in the DOM."
  );
}
