// The One-Liner Groan-Off — a single original dad joke, one line, <= 140 chars.
// Writes the joke to /output/entry.txt and exits 0. Deterministic: no
// randomness, no network, no clock. Erasable-only TypeScript for program/v1.
// The joke below is original, written for this bounty: a baking pun where
// "dough" (money) and "loaf" (loafing around) land the groan in one breath.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const JOKE: string =
  "I told my wife I wanted to be a baker, but I couldn't make enough dough, so now I just loaf around the house.";

function main(): void {
  const line: string = JOKE.trim();
  if (line.length < 1 || line.length > 140) {
    throw new Error("joke must be 1-140 chars, got " + String(line.length));
  }
  if (line.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, line + "\n", "utf8");
  chmodSync(outPath, 0o644);
  console.log(line);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
