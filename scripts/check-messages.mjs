// Verifies every locale message file has the exact same key set as en.json.
// Run with: npm run translations:check
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "messages");
const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === "object"
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );

const keySets = new Map(
  files.map((f) => [
    f,
    new Set(flatten(JSON.parse(readFileSync(join(dir, f), "utf8")))),
  ])
);

const reference = keySets.get("en.json");
if (!reference) {
  console.error("messages/en.json not found");
  process.exit(1);
}

let failed = false;
for (const [file, keys] of keySets) {
  if (file === "en.json") continue;
  const missing = [...reference].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !reference.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`✗ ${file}`);
    for (const k of missing) console.error(`    missing: ${k}`);
    for (const k of extra) console.error(`    extra:   ${k}`);
  } else {
    console.log(`✓ ${file} (${keys.size} keys)`);
  }
}

console.log(`✓ en.json (${reference.size} keys, reference)`);
process.exit(failed ? 1 : 0);
