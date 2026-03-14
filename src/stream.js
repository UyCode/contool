import readline from "node:readline";
import { convert } from "./converter.js";

export function streamConvert(toBase){
  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", line=>{
    if(!line.trim()) return;
    console.log(convert(line.trim(), toBase));
  });
}