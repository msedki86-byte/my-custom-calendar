// tools/flatten.mjs
import { readdir, readFile, writeFile, appendFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = ".";
const OUTFILE = "mon_projet_flattened.md";

// Dossiers exclus
const EXCLUDE_DIRS = new Set([
  ".git", "node_modules", ".next", "dist", "build", "out", "coverage",
  ".turbo", ".cache", ".vercel", ".github" // <-- garde si tu ne veux pas inclure le workflow
]);

// Fichiers racine à EXCLURE
const EXCLUDE_FILES = new Set([
  "package-lock.json", "pnpm-lock.yaml", "yarn.lock", OUTFILE
]);

// Fichiers racine à INCLURE (s’ils existent)
const ROOT_WHITELIST = new Set([
  "package.json", "vite.config.ts", "vite.config.js",
  "tailwind.config.ts", "tailwind.config.js",
  "postcss.config.js", "eslint.config.js",
  "tsconfig.json", "index.html",
  "components.json", // shadcn/ui
  "src/index.css" // ajuste selon ton projet
]);

// Extensions qu’on veut aplatir partout (incluant .env/.md si tu veux)
const EXTS = new Set([
  "ts","tsx","js","jsx","json","css","scss","md","html","svg","yml","yaml","sh","env","txt"
]);

const langFromExt = (ext) => ({
  ts:"ts", tsx:"ts", js:"js", jsx:"js",
  css:"css", scss:"css", md:"md",
  html:"html", svg:"html", yml:"yaml", yaml:"yaml",
  sh:"bash", env:"properties", json:"json"
}[ext] ?? "");

// Parcours sélectif
async function walk(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);

    // Exclusions de dossiers
    if (e.isDirectory()) {
      if (!EXCLUDE_DIRS.has(e.name)) await walk(p, out);
      continue;
    }

    if (!e.isFile()) continue;

    const rel = path.relative(ROOT, p) || p;

    // Exclusions de fichiers
    const base = path.basename(p);
    if (EXCLUDE_FILES.has(base)) continue;

    // On n’inclut que:
    //  - les fichiers sous src/**
    //  - et les fichiers racine de la whitelist
    const isInSrc = rel.startsWith(`src${path.sep}`);
    const isRootWhitelisted = ROOT_WHITELIST.has(rel) || ROOT_WHITELIST.has(base);

    if (!isInSrc && !isRootWhitelisted) continue;

    // Filtre par extension (sauf index.html etc. déjà whitelisted)
    const ext = base.includes(".") ? base.split(".").pop() : "";
    if (!isInSrc && isRootWhitelisted) {
      out.push(rel);
      continue;
    }
    if (EXTS.has(ext)) out.push(rel);
  }
  return out;
}

async function isProbablyText(file) {
  const s = await stat(file);
  if (s.size === 0) return true;
  const buf = await readFile(file, { encoding: "utf8" }).catch(() => null);
  if (buf == null) return false;
  // Heuristique simple: présence de caractères imprimables
  return /[\t\n\r\u0020-\u007E]/.test(buf.slice(0, 2048));
}

async function main() {
  await writeFile(OUTFILE, "");

  const files = (await walk(ROOT))
    .filter(f => f !== OUTFILE)
    .sort((a,b) => a.localeCompare(b));

  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    if (!(await isProbablyText(abs))) continue; // skip binaires

    const ext = rel.split(".").pop();
    const lang = langFromExt(ext);

    await appendFile(OUTFILE, `\n\n// path: ${rel}\n\`\`\`${lang}\n`);
    await appendFile(OUTFILE, await readFile(abs));
    await appendFile(OUTFILE, `\n\`\`\`\n`);
  }
  console.log(`✅ Généré: ${OUTFILE} (${files.length} fichiers)`);
}
main().catch(e => (console.error(e), process.exit(1)));
