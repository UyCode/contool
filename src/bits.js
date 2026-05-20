import chalk from "chalk";
import { convert } from "./converter.js";

export function inspectBits(value, fromBase) {
  const decimal = convert(value,10,fromBase);
  const binary = convert(value,2,fromBase);
  const padded = binary.padStart(Math.ceil(binary.length/8)*8,"0");
  const groups = padded.match(/.{1,8}/g).join(" ");
  console.log(chalk.cyan("decimal:"),decimal);
  console.log(chalk.cyan("binary :"),binary);
  console.log(chalk.cyan("bits   :"),groups);
}
