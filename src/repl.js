import readline from "node:readline";
import { printTable } from "./table.js";

export function startRepl() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt:"contool> "});
  rl.prompt();
  rl.on("line", line=>{
    if(line.trim()==="exit"){ rl.close(); return; }
    printTable(line.trim());
    rl.prompt();
  });
}