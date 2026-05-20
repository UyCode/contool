export function evaluateExpression(expr) {
  console.log(calculateExpression(expr));
}

export function calculateExpression(expr) {
  const parser = new Parser(tokenize(expr));
  return parser.parse().toString();
}

function tokenize(expr) {
  const tokens = [];
  let index = 0;
  while (index < expr.length) {
    const char = expr[index];
    if (/\s/.test(char)) {
      index++;
      continue;
    }

    const rest = expr.slice(index);
    const number = /^(0x[0-9a-f]+|0b[01]+|0o[0-7]+|\d+)/i.exec(rest);
    if (number) {
      tokens.push({ type: "number", value: parseNumber(number[0]) });
      index += number[0].length;
      continue;
    }

    const operator = /^(<<|>>|[()+\-*/%&|^~])/.exec(rest);
    if (operator) {
      tokens.push({ type: "operator", value: operator[0] });
      index += operator[0].length;
      continue;
    }

    throw new Error(`Unexpected token '${char}'`);
  }
  return tokens;
}

function parseNumber(value) {
  if (/^0x/i.test(value)) return BigInt(`0x${value.slice(2)}`);
  if (/^0b/i.test(value)) return BigInt(`0b${value.slice(2)}`);
  if (/^0o/i.test(value)) return BigInt(`0o${value.slice(2)}`);
  return BigInt(value);
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
  }

  parse() {
    const result = this.parseBitwiseOr();
    if (this.peek()) throw new Error(`Unexpected token '${this.peek().value}'`);
    return result;
  }

  parseBitwiseOr() {
    return this.parseBinary(() => this.parseBitwiseXor(), ["|"], (left, right) => left | right);
  }

  parseBitwiseXor() {
    return this.parseBinary(() => this.parseBitwiseAnd(), ["^"], (left, right) => left ^ right);
  }

  parseBitwiseAnd() {
    return this.parseBinary(() => this.parseShift(), ["&"], (left, right) => left & right);
  }

  parseShift() {
    return this.parseBinary(() => this.parseAdditive(), ["<<", ">>"], (left, right, operator) => {
      if (right < 0n) throw new Error("Shift count must be non-negative");
      return operator === "<<" ? left << right : left >> right;
    });
  }

  parseAdditive() {
    return this.parseBinary(() => this.parseMultiplicative(), ["+", "-"], (left, right, operator) => {
      return operator === "+" ? left + right : left - right;
    });
  }

  parseMultiplicative() {
    return this.parseBinary(() => this.parseUnary(), ["*", "/", "%"], (left, right, operator) => {
      if ((operator === "/" || operator === "%") && right === 0n) {
        throw new Error("Division by zero");
      }
      if (operator === "*") return left * right;
      return operator === "/" ? left / right : left % right;
    });
  }

  parseUnary() {
    if (this.match("+")) return this.parseUnary();
    if (this.match("-")) return -this.parseUnary();
    if (this.match("~")) return ~this.parseUnary();
    return this.parsePrimary();
  }

  parsePrimary() {
    const token = this.peek();
    if (!token) throw new Error("Unexpected end of expression");

    if (token.type === "number") {
      this.index++;
      return token.value;
    }

    if (this.match("(")) {
      const result = this.parseBitwiseOr();
      if (!this.match(")")) throw new Error("Expected ')'");
      return result;
    }

    throw new Error(`Unexpected token '${token.value}'`);
  }

  parseBinary(next, operators, apply) {
    let left = next();
    while (operators.includes(this.peek()?.value)) {
      const operator = this.peek().value;
      this.index++;
      left = apply(left, next(), operator);
    }
    return left;
  }

  match(value) {
    if (this.peek()?.value !== value) return false;
    this.index++;
    return true;
  }

  peek() {
    return this.tokens[this.index];
  }
}
