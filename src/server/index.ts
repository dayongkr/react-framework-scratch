import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { rollup } from "rollup";
import swcPlugin from "@rollup/plugin-swc";
import { renderToString } from "react-dom/server";
import { resolve } from "path";
import { jsx } from "react/jsx-runtime";

// For client-side rendering
// import commonjsPlugin from "@rollup/plugin-commonjs";
// import resolvePlugin from "@rollup/plugin-node-resolve";

const buildDir = resolve(process.cwd(), "build");
const appDir = resolve(process.cwd(), "src/app");

const app = new Hono();

app.get("/", async (c) => {
  const page = await import(resolve(buildDir, "page.js"));
  const html = renderToString(jsx(page.default, {}));
  return c.html(html);
});

serve(app, async (info) => {
  await build();
  console.log(`Server is running on http://localhost:${info.port}`);
});

async function build() {
  const bundle = await rollup({
    input: resolve(appDir, "page.tsx"),
    plugins: [
      // resolvePlugin({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
      // commonjsPlugin(),
      swcPlugin(),
    ],
    external: ["react", "react-dom"],
  });

  await bundle.write({
    format: "es",
    dir: buildDir,
    generatedCode: "es2015",
    sourcemap: true,
  });
}
