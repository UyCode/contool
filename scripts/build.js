import esbuild from "esbuild";

await esbuild.build({
  entryPoints:["bin/contool.js"],
  bundle:true,
  platform:"node",
  format:"esm",
  packages:"external",
  outfile:"dist/contool.js"
});