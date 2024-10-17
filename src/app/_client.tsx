import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);
import { ReactNode } from "react";

createFromFetch(fetch("/rsc")).then((component) =>
  root.render(component as ReactNode)
);
