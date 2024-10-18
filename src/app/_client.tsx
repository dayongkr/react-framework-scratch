import { useState } from "react";
import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

function ClientComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Client Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

createFromFetch(fetch("/rsc")).then((component) =>
  root.render(
    <>
      <ClientComponent />
      {component}
    </>
  )
);
