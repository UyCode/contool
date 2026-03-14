import chalk from "chalk";
import { convert } from "./converter.js";

export function printTable(value) {
  const bases = [["Decimal",10],["Binary",2],["Octal",8],["Hex",16]];
  for (const [name, base] of bases) {
    console.log(chalk.cyan(name.padEnd(8)), chalk.yellow(convert(value, base, 10)));
  }
}