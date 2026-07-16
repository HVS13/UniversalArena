#!/usr/bin/env node

function fail(message) {
  console.error(`Power calculator error: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) fail(`unexpected argument ${token}`);
    const key = token.slice(2);
    if (["pure", "created", "ultimate", "help"].includes(key)) {
      args[key] = true;
      continue;
    }
    const value = argv[i + 1];
    if (value === undefined || value.startsWith("--")) fail(`missing value for --${key}`);
    args[key] = value;
    i += 1;
  }
  return args;
}

function numberArg(args, key, fallback = undefined) {
  if (args[key] === undefined) return fallback;
  const value = Number(args[key]);
  if (!Number.isFinite(value)) fail(`--${key} must be a finite number`);
  return value;
}

function rangeFor(basePower, rangeType) {
  const rate = rangeType === "melee" ? 0.2 : 0.25;
  const adjustment = Math.floor(basePower * rate);
  return {
    minimum: Math.max(0, basePower - adjustment),
    maximum: basePower + adjustment,
    adjustment,
  };
}

function printHelp() {
  console.log(`Universal Arena Power calculator

Usage:
  npm run power -- --constant <base> --range <melee|ranged> [options]

Required:
  --constant <number>          Constant Cost Base Power component
  --range <melee|ranged>       Printed range type

Optional components:
  --per-x <number>             Cost Base Power coefficient for X (default 0)
  --pure                       Apply the x1.20 pure-output multiplier
  --created                    Apply the x0.90 Created multiplier
  --speed <fast|normal|slow>   Apply x0.90, x1.00, or x1.10 (default normal)
  --ultimate                   Ignore automatic speed multipliers
  --execution <number>         Execution multiplier (default 1)
  --utility-constant <number>  Subtract from the rounded constant component
  --utility-per-x <number>     Subtract from the rounded X component
  --allocation-constant <n>    Add to the constant component after utility
  --allocation-per-x <number>  Add to the X component after utility
  --ceiling <number>           Cap Final Base Power for a fixed card
  --help                       Show this help

Examples:
  npm run power -- --constant 20 --range melee --pure --speed slow
  npm run power -- --constant 10 --range melee --pure --created --speed fast
  npm run power -- --constant 30 --per-x 10 --range melee --ultimate
`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const constant = numberArg(args, "constant");
if (constant === undefined) fail("--constant is required");
if (constant < 0) fail("--constant cannot be negative");

const perX = numberArg(args, "per-x", 0);
if (perX < 0) fail("--per-x cannot be negative");

const rangeType = args.range;
if (!new Set(["melee", "ranged"]).has(rangeType)) {
  fail("--range must be melee or ranged");
}

const speed = args.speed ?? "normal";
if (!new Set(["fast", "normal", "slow"]).has(speed)) {
  fail("--speed must be fast, normal, or slow");
}

const execution = numberArg(args, "execution", 1);
if (execution <= 0) fail("--execution must be greater than 0");

const speedMultipliers = { fast: 0.9, normal: 1, slow: 1.1 };
const pureMultiplier = args.pure ? 1.2 : 1;
const createdMultiplier = args.created ? 0.9 : 1;
const speedMultiplier = args.ultimate ? 1 : speedMultipliers[speed];
const totalMultiplier = pureMultiplier * createdMultiplier * speedMultiplier * execution;

const utilityConstant = numberArg(args, "utility-constant", 0);
const utilityPerX = numberArg(args, "utility-per-x", 0);
const allocationConstant = numberArg(args, "allocation-constant", 0);
const allocationPerX = numberArg(args, "allocation-per-x", 0);

const adjustedConstant = Math.floor(constant * totalMultiplier);
const adjustedPerX = Math.floor(perX * totalMultiplier);

let finalConstant = Math.max(0, adjustedConstant - utilityConstant + allocationConstant);
const finalPerX = Math.max(0, adjustedPerX - utilityPerX + allocationPerX);

const ceiling = numberArg(args, "ceiling", undefined);
if (ceiling !== undefined) {
  if (perX !== 0) fail("--ceiling currently supports fixed cards only");
  if (ceiling < 0) fail("--ceiling cannot be negative");
  finalConstant = Math.min(finalConstant, ceiling);
}

const constantRange = rangeFor(finalConstant, rangeType);
const perXRange = rangeFor(finalPerX, rangeType);
const printedPower = finalPerX === 0
  ? `${constantRange.minimum}-${constantRange.maximum}`
  : `${constantRange.minimum}-${constantRange.maximum} + ${perXRange.minimum}-${perXRange.maximum} times X`;

console.log("Power Budget Result");
console.log(`Cost Base Power: ${perX === 0 ? constant : `${constant} + ${perX}X`}`);
console.log(`Pure-output multiplier: ${pureMultiplier}`);
console.log(`Created multiplier: ${createdMultiplier}`);
console.log(`Printed-speed multiplier: ${speedMultiplier}${args.ultimate ? " (Ultimate override)" : ""}`);
console.log(`Execution multiplier: ${execution}`);
console.log(`Combined multiplier: ${totalMultiplier}`);
console.log(`Adjusted Base Power: ${adjustedPerX === 0 ? adjustedConstant : `${adjustedConstant} + ${adjustedPerX}X`}`);
console.log(`Utility adjustment: -${utilityConstant}${utilityPerX === 0 ? "" : ` - ${utilityPerX}X`}`);
console.log(`Allocation: +${allocationConstant}${allocationPerX === 0 ? "" : ` + ${allocationPerX}X`}`);
if (ceiling !== undefined) console.log(`Ceiling: ${ceiling}`);
console.log(`Final Base Power: ${finalPerX === 0 ? finalConstant : `${finalConstant} + ${finalPerX}X`}`);
console.log(`Range type: ${rangeType}`);
console.log(`Printed Power: ${printedPower}`);
