// Dehydrated Water — catalogue photo entry.
// Writes the entry image to the output directory as entry.png.
// The output directory is a bind mount in the grading sandbox, so this
// program never removes it: it only creates it if missing and writes
// the file inside it.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(source);
writeFileSync(target, bytes);

// Verify the write landed complete: the grading sandbox only keeps a
// whole image, so a short write must fail loudly here, not silently.
const written = readFileSync(target);
if (written.length !== bytes.length || !written.equals(bytes)) {
  throw new Error("entry.png was not written whole to " + target);
}

if (!existsSync(target)) {
  throw new Error("entry.png was not written to " + target);
}
console.log("wrote " + target + " (" + bytes.length + " bytes)");
