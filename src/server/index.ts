import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createRsbuild } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { resolve } from "path";

const buildDir = resolve(process.cwd(), "build");

const app = new Hono();

app.get("/", async (c) => {
  const page = await import(resolve(buildDir, "page.cjs"));
  const html = renderToString(createElement(page.default));
  return c.html(html);
});

serve(app, async (info) => {
  await build();
  console.log(`Server is running on http://localhost:${info.port}`);
});

async function build() {
  const rsbuild = await createRsbuild({
    rsbuildConfig: {
      source: {
        entry: {
          page: "./src/app/page.tsx",
        },
      },
      output: {
        target: "node",
        distPath: {
          root: "build",
        },
        filename: {
          js: "[name].cjs",
        },
      },
      plugins: [pluginReact()],
    },
  });

  await rsbuild.build();
}
