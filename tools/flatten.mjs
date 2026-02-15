// tools/flatten.mjs
import { readdir, readFile, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";

const ROOT = ".";
const OUTFILE = "mon_projet_flattened.md";
const EXTS = new Set(["ts","tsx","js","jsx","json","css","scss","md","html","svg","yml","yaml","sh","env","txt"]);
const EXCLUDE_DIRS = new Set([".git","node_modules",".next","dist","build","out","coverage",".turbo",".cache",".vercel",".github"]); // on ignore .github pour éviter de s’inclure

const langFromExt = (ext) => ({
  ts:"ts", tsx:"ts", js:"js", jsx:"js",
  css:"css", scss:"css", md:"md",
  html:"html", svg:"html", yml:"yaml", yaml:"yaml",
  sh:"bash", env:"properties", json:"json"
}[ext] ?? "");

async function walk(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!EXCLUDE_DIRS.has(e.name)) await walk(p, out);
    } else if (e.isFile()) {
      const ext = e.name.split(".").pop();
      if (EXTS.has(ext)) out.push(p);
    }
  }
  return out;
}

async function main() {
  await writeFile(OUTFILE, "");
  const files = (await walk(ROOT)).sort((a,b) => a.localeCompare(b));

  for (const f of files) {
    // lecture brute (on suppose texte; pour binaires on pourrait raffiner)
    const buf = await readFile(f);
    const rel = path.relative(ROOT, f) || f;
    const ext = rel.split(".").pop();
    const lang = langFromExt(ext);

    await appendFile(OUTFILE, `\n\n// path: ${rel}\n\`\`\`${lang}\n`);
    await appendFile(OUTFILE, buf);
    await appendFile(OUTFILE, `\n\`\`\`\n`);
  }
  console.log(`✅ Généré: ${OUTFILE}`);
}
main().catch(err => (console.error(err), process.exit(1)));
``
