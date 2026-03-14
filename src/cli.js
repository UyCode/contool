import { Command } from "commander";
import { convert } from "./converter.js";
import { printTable } from "./table.js";
import { inspectBits } from "./bits.js";
import { evaluateExpression } from "./calc.js";
import { startRepl } from "./repl.js";
import { streamConvert } from "./stream.js";

export function runCLI() {

  const program = new Command();

  program
    .argument("[value]")
    .option("--from <base>")
    .option("--to <base>")
    .option("-a, --all")
    .option("--bits")
    .option("-i, --interactive")
    .parse();

  const opts = program.opts();
  const value = program.args[0];

  if (opts.interactive) {
    startRepl();
    return;
  }

  if (program.args[0] === "calc") {
    evaluateExpression(program.args.slice(1).join(" "));
    return;
  }

  const toBase = parseBase(opts.to) || 2;
  const fromBase = parseBase(opts.from);

  if (!value) {
    streamConvert(toBase);
    return;
  }

  if (opts.all) {
    printTable(value);
    return;
  }

  if (opts.bits) {
    inspectBits(value);
    return;
  }

  console.log(convert(value, toBase, fromBase));
}

function parseBase(v) {
  if (!v) return;
  const map = { bin:2, binary:2, oct:8, octal:8, dec:10, decimal:10, hex:16 };
  return map[v];
}