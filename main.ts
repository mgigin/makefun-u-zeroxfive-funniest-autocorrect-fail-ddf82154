// Funniest Autocorrect Fail — make.fun entry (v2)
// Deterministic, no network, no dependencies.
// Writes one single-line autocorrect fail (1-199 chars) to /output/entry.txt
// and validates the gate inside the program.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I texted the vet 'my dog is in heat' — autocorrect sent 'my dog is in heaven', so now he's sending a sympathy card and asking if I want the ashes back in an urn or a jar.";

// Gate (from kit RULES.txt): UTF-8 text of 1 to 199 characters, not only whitespace.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 199) {
  throw new Error(`gate failed: entry is ${chars} chars, must be 1-199`);
}
if (!ENTRY.trim()) throw new Error("gate failed: entry is only whitespace");
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("gate failed: entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`wrote ${chars} chars to ${outDir}/entry.txt`);
