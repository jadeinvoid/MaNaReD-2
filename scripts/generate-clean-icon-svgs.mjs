/**
 * Extracts clean icon SVGs from Figma MCP exports (removes frame chrome).
 * Run: node scripts/generate-clean-icon-svgs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/app/assets/icons");

const VIEWBOX = {
  search: "0 0 17 17",
  filter: "0 0 20 19",
  "arrow-up": "0 0 12 16",
  "arrow-down": "0 0 12 16",
  workspace: "0 0 17 17",
  explore: "0 0 17 17",
  overview: "0 0 17 17",
  compound: "-2 -2 30 30",
  "no-filter": "0 0 24 24",
  organism: "0 0 26 12",
  profile: "0 0 34 34",
  "vertical-collapse": "0 0 32 32",
  expand: "0 0 24 24",
  "chevron-up": "0 0 24 24",
  "chevron-down": "0 0 24 24",
  "chevron-left": "0 0 24 24",
  "chevron-right": "0 0 24 24",
};

function extractVectorPaths(svg) {
  const paths = [];
  for (const m of svg.matchAll(/<path[^>]*\bid="Vector"[^>]*\/?>/g)) {
    paths.push(m[0]);
  }
  if (paths.length === 0) {
    for (const m of svg.matchAll(/<path[^>]*d="([^"]+)"[^>]*\/?>/g)) {
      const el = m[0];
      const d = m[1];
      if (d.startsWith("M-") || d.includes("1130.8")) continue;
      if (/fill="#(?:D2D9FF|F5F5F5|FFFFFF|white)"/i.test(el)) continue;
      if (el.includes('fill-opacity="0.1"')) continue;
      if (el.includes('fill="#E9F1F9"')) continue;
      if (/stroke="#E5E7EB"/.test(el) && el.includes("0.5H28")) continue;
      paths.push(el);
    }
  }
  return paths;
}

function normalizePath(el) {
  return el
    .replace(/stroke="#[^"]+"/g, 'stroke="currentColor"')
    .replace(/stroke="black"/g, 'stroke="currentColor"')
    .replace(/stroke="white"/g, 'stroke="currentColor"')
    .replace(/fill="#[^"]+"/g, 'fill="currentColor"')
    .replace(/fill="black"/g, 'fill="currentColor"');
}

for (const file of fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith(".svg") && f !== "organism-vector.svg" && f !== "remove.svg")) {
  const name = file.replace(/\.svg$/, "");
  const svg = fs.readFileSync(path.join(ROOT, file), "utf8");
  const paths = extractVectorPaths(svg).map(normalizePath);
  if (paths.length === 0) {
    console.warn(`skip ${name}: no paths`);
    continue;
  }
  const viewBox = VIEWBOX[name] ?? svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";
  const clean = `<svg viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${paths.join("\n")}\n</svg>\n`;
  fs.writeFileSync(path.join(ROOT, file), clean);
  console.log(`cleaned ${name} (${paths.length} paths)`);
}

// organism from separate vector export (first run only)
const orgVector = path.join(ROOT, "organism-vector.svg");
if (fs.existsSync(orgVector)) {
  const orgSvg = fs.readFileSync(orgVector, "utf8");
  const orgPaths = extractVectorPaths(orgSvg).map(normalizePath);
  if (orgPaths.length) {
    fs.writeFileSync(
      path.join(ROOT, "organism.svg"),
      `<svg viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n${orgPaths.join("\n")}\n</svg>\n`,
    );
    console.log("cleaned organism from vector export");
  }
  fs.unlinkSync(orgVector);
}

for (const file of fs.readdirSync(path.join(ROOT, "variants")).filter((f) => f.endsWith(".svg"))) {
  const svg = fs.readFileSync(path.join(ROOT, "variants", file), "utf8");
  const paths = extractVectorPaths(svg).map(normalizePath);
  if (paths.length === 0) {
    console.warn(`skip variant ${file}`);
    continue;
  }
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";
  fs.writeFileSync(
    path.join(ROOT, "variants", file),
    `<svg viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${paths.join("\n")}\n</svg>\n`,
  );
  console.log(`cleaned variant ${file}`);
}
