import { evaluate } from 'mathjs';

export function evaluateExpression(expr) {
  const cleaned = expr
    .replace(/0x([0-9a-f]+)/gi,(m,v)=>parseInt(v,16))
    .replace(/0b([01]+)/gi,(m,v)=>parseInt(v,2))
    .replace(/0o([0-7]+)/gi,(m,v)=>parseInt(v,8));
  console.log(evaluate(cleaned));
}