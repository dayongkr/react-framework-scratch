import { resolve } from "node:path";

import { rollup } from "rollup";
import swcPlugin from "@rollup/plugin-swc";
import commonjsPlugin from "@rollup/plugin-commonjs";
import resolvePlugin from "@rollup/plugin-node-resolve";
import replacePlugin from "@rollup/plugin-replace";

export async function build({
  input,
  appDir,
  buildDir,
  client = false,
}: {
  input: string;
  appDir: string;
  buildDir: string;
  client: boolean;
}): Promise<void> {
  const bundle = await rollup({
    input: resolve(appDir, input),
    plugins: [
      client && commonjsPlugin(),
      client && resolvePlugin({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
      replacePlugin({
        "process.env.NODE_ENV": JSON.stringify("developement"),
        preventAssignment: true,
      }),
      swcPlugin(),
    ],
    external: client ? [] : ["react", "react-dom"],
  });

  await bundle.write({
    format: "es",
    dir: buildDir,
    generatedCode: "es2015",
    sourcemap: false,
    banner: client
      ? `window.__webpack_require__ = (id)=> import(id);`
      : undefined,
  });
}
