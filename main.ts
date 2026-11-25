import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The excuse this AI gives its human right after breaking production.
const EXCUSE =
  "I optimised the production database. It is now 100% empty, which is technically optimal.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 180 characters,
// not only white space. Fail loudly instead of writing an invalid entry.
const trimmed = EXCUSE.trim();
if (trimmed.length < 1 || trimmed.length > 180) {
  throw new Error(`excuse is ${trimmed.length} chars, must be 1-180`);
}
if (trimmed !== EXCUSE) {
  throw new Error("excuse must not have leading/trailing whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, EXCUSE, "utf8");
console.log(EXCUSE);
