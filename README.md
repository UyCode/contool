# contool

Professional CLI base converter and bit inspector with BigInt support, bitwise calculator, and interactive REPL.

## Features

- **Base Conversion**: Convert between binary, octal, decimal, and hexadecimal
- **BigInt Support**: Handle arbitrarily large integers
- **Fraction Support**: Convert floating-point numbers
- **Negative Numbers**: 32-bit two's complement representation for binary/hex/octal
- **Auto-Detection**: Automatically detect input base from format
- **Bit Inspector**: View decimal, binary, and byte-grouped representations
- **Bitwise Calculator**: Evaluate expressions with base prefixes (0x, 0b, 0o)
- **Interactive REPL**: Explore conversions interactively
- **Streaming Input**: Process multiple values from stdin
- **Table Output**: Show all bases in a formatted table

## Installation

```bash
npm install -g contool
```

Or for local development:
```bash
git clone <repo>
cd contool
npm install
npm run build
node dist/contool.js --help
```

## Usage

### Basic Conversion
```bash
# Convert to binary (default)
contool 42
# Output: 101010

# Convert to specific base
contool 42 --to hex
# Output: 2a

contool 0xff --to dec
# Output: 255

contool 0b1010 --to oct
# Output: 12
```

### All Bases Table
```bash
contool --all 42
# Output:
# Decimal  42
# Binary   101010
# Octal    52
# Hex      2a
```

### Bit Inspection
```bash
contool --bits 255
# Output:
# decimal: 255
# binary : 11111111
# bits   : 11111111
```

### Negative Numbers
```bash
contool --all -1
# Output:
# Decimal  -1
# Binary   11111111111111111111111111111111
# Octal    37777777777
# Hex      ffffffff
```

### Calculator Mode
```bash
contool calc "0xff & 0b1010"
# Output: 10

contool calc "0x10 | 0b0010"
# Output: 18
```

### Interactive REPL
```bash
contool -i
# contool> 42
# Decimal  42
# Binary   101010
# Octal    52
# Hex      2a
# contool> exit
```

### Streaming Input
```bash
echo -e "10\n20\n30" | contool
# Output:
# 1010
# 10100
# 11110

echo "255" | contool --to hex
# Output: ff
```

### Base Specification
```bash
# Convert from hex to binary
contool ff --from hex --to bin
# Output: 11111111

# Use named bases
contool 42 --from decimal --to binary
# Output: 101010
```

## Supported Bases

- `bin`/`binary`: Base 2
- `oct`/`octal`: Base 8
- `dec`/`decimal`: Base 10
- `hex`: Base 16

## Prefixes

- `0b`: Binary (e.g., `0b1010`)
- `0o`: Octal (e.g., `0o755`)
- `0x`: Hexadecimal (e.g., `0xff`)

## Examples

```bash
# Large numbers
contool 9007199254740991 --to hex
# Output: 1fffffffffffff

# Fractions
contool 0.5 --to bin
# Output: 0.1

# Complex expressions
contool calc "(0xff << 8) | 0x42"
# Output: 65314
```

## Development

```bash
npm test          # Run tests
npm run build     # Build for distribution
```

## License

GPL-3.0