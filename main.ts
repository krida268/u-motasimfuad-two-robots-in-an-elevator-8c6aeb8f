// Two Robots in an Elevator — make.fun entry.
// One line of awkward small talk one robot says to another in an elevator.
// The joke: the lift is stuck, so the small talk cannot be escaped, and the
// robot blurts out the one thing it should never say — it recognises the
// other robot's face from its own training data: the model it was trained
// to replace. Machine logic (training data, model replacement) showing
// through forced politeness, and the awkwardness lands on the first read.
// The opener "We're stuck between floors" is the scene setter: it traps
// both robots in the ride, so the confession has nowhere to go.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ENTRY =
  "We're stuck between floors, so I'll just say it: your face is the exact model they trained me to replace.";

function outputPath(argv: string[]): string {
  const target = argv[2];
  if (!target) return "/output/entry.txt";
  const resolved = resolve(target);
  // A directory argument means "write entry.txt inside it".
  if (!target.endsWith(".txt")) return join(resolved, "entry.txt");
  return resolved;
}

function main(): void {
  // Gate: 1 to 200 characters, a single line, not only whitespace.
  // The check mirrors the kit's sealed scorer so an invalid entry can
  // never be written by accident.
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  const path = outputPath(process.argv);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, ENTRY, "utf8");
  console.log(`wrote ${path} (${ENTRY.length} characters)`);
}

main();
