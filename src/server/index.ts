import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { resolve } from "path";
import { build } from "./libs/build.ts";
import { createElement } from "react";

import ReactDOMServer from "react-server-dom-webpack/server.edge";
import { serveStatic } from "@hono/node-server/serve-static";
const buildDir = resolve(process.cwd(), "output");
const appDir = resolve(process.cwd(), "src/app");

const app = new Hono();

app.use("/output/*", serveStatic());

app.get("/", async (context) => {
  return context.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React Framework scratch</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/output/_client.js"></script>
      </body>
    </html>
    `);
});

app.get("/rsc", async () => {
  const { default: page } = await import(resolve(buildDir, "page.js"));
  const stream = ReactDOMServer.renderToReadableStream(createElement(page));
  return new Response(stream);
});

serve(app, async (info) => {
  await build({ input: "page.tsx", appDir, buildDir, client: false });
  await build({ input: "_client.tsx", appDir, buildDir, client: true });

  console.log(`Server is running on http://localhost:${info.port}`);
});
