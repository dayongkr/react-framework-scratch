import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { resolve } from "path";
import { jsx } from "react/jsx-runtime";
import { build } from "./libs/build";

const buildDir = resolve(process.cwd(), "output");
const appDir = resolve(process.cwd(), "src/app");

const app = new Hono();

app.get("/", async (context) => {
  const { default: page } = await import(resolve(buildDir, "page.js"));
  const html = renderToString(jsx(page, {}));
  return context.html(html);
});

serve(app, async (info) => {
  await build({ appDir, buildDir });
  console.log(`Server is running on http://localhost:${info.port}`);
});
