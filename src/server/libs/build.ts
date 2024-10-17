import { rollup } from "rollup";
import swcPlugin from "@rollup/plugin-swc";
import { resolve } from "node:path";

// For client-side rendering
// import commonjsPlugin from "@rollup/plugin-commonjs";
// import resolvePlugin from "@rollup/plugin-node-resolve";

export async function build({
  appDir,
  buildDir,
}: {
  appDir: string;
  buildDir: string;
}): Promise<void> {
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
