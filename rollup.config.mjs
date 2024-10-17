import swcPlugin from "@rollup/plugin-swc";

export default {
  input: "src/server/index.ts",
  plugins: [swcPlugin()],
  output: {
    dir: "dist",
    format: "es",
    sourcemap: false,
    preserveModules: true,
    generatedCode: "es2015",
  },
};
