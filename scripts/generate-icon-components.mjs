/**
 * Generates icon-svgs.tsx from committed SVG assets.
 * Run: node scripts/generate-icon-components.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ICONS_DIR = path.resolve("src/app/assets/icons");
const OUT = path.resolve("src/app/components/manared/icons/icon-svgs.tsx");

const COMPONENT_MAP = {
  search: "SearchIcon",
  filter: "FilterIcon",
  compound: "CompoundIcon",
  organism: "OrganismIcon",
  profile: "ProfileIcon",
  explore: "ExploreIcon",
  workspace: "WorkspaceIcon",
  overview: "OverviewIcon",
  "arrow-up": "ArrowUpIcon",
  "arrow-down": "ArrowDownIcon",
  expand: "ExpandIcon",
  "vertical-collapse": "VerticalCollapseIcon",
  remove: "RemoveIcon",
  "chevron-right": "ChevronRightIcon",
  "no-filter": "NoFilterIcon",
  "chevron-up": "ChevronUpIcon",
  "chevron-down": "ChevronDownIcon",
  "chevron-left": "ChevronLeftIcon",
};

const VARIANT_MAP = {
  "vertical-collapse-expand": "VerticalCollapseExpandIcon",
  "expand-right-hover": "ExpandRightHoverIcon",
  "expand-right-active": "ExpandRightActiveIcon",
  "expand-left-default": "ExpandLeftDefaultIcon",
  "expand-left-hover": "ExpandLeftHoverIcon",
  "expand-left-active": "ExpandLeftActiveIcon",
  "move-left": "MoveLeftIcon",
  "move-right": "MoveRightIcon",
  "icon-state-default-a": "IconStateDefaultAIcon",
  "icon-state-hover-a": "IconStateHoverAIcon",
  "icon-state-focused-a": "IconStateFocusedAIcon",
  "icon-state-hover-b": "IconStateHoverBIcon",
  "icon-state-focused-b": "IconStateFocusedBIcon",
};

function stripStrokeWidth(attrs) {
  return attrs.replace(/\sstroke-width="[^"]*"/g, "").replace(/\sstrokeWidth="[^"]*"/g, "");
}

function normalizeInnerSvg(inner) {
  return inner.replace(/<path(\s[^>]*?)(\/?)>/g, (match, attrs, selfClose) => {
    let normalized = stripStrokeWidth(attrs);
    if (/stroke="currentColor"/.test(normalized) && !/vectorEffect=/.test(normalized)) {
      normalized += ' vectorEffect="non-scaling-stroke"';
    }
    return `<path${normalized}${selfClose ? " /" : ""}>`;
  });
}

function svgToJsx(svg, indent = "      ") {
  const open = svg.match(/<svg[^>]*>/)?.[0] ?? "";
  const viewBox = open.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";
  const inner = normalizeInnerSvg(svg.replace(/<\/?svg[^>]*>/g, "").trim());
  const jsxInner = inner
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-opacity=/g, "fillOpacity=")
    .replace(/vector-effect=/g, "vectorEffect=")
    .replace(/\bid="[^"]*"/g, "")
    .split("\n")
    .map((line) => indent + line.trim())
    .filter(Boolean)
    .join("\n");
  return { viewBox, jsxInner };
}

function renderComponent(exportName, svg) {
  const { viewBox, jsxInner } = svgToJsx(svg);
  return `export function ${exportName}(props: IconSvgProps) {
  return (
    <svg viewBox="${viewBox}" fill="none" aria-hidden {...props}>
${jsxInner}
    </svg>
  );
}`;
}

function renderLogo() {
  return `export function LogoIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.15" />
      <text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">
        M
      </text>
    </svg>
  );
}`;
}

function renderRemoveFallback() {
  return `export function RemoveIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 8 8" fill="none" aria-hidden {...props}>
      <path
        d="M1 1l6 6M7 1L1 7"
        stroke="currentColor"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}`;
}

const parts = [
  'import type { SVGProps } from "react";',
  "",
  "type IconSvgProps = SVGProps<SVGSVGElement>;",
  "",
];

for (const [file, exportName] of Object.entries(COMPONENT_MAP)) {
  if (file === "remove") {
    parts.push(renderRemoveFallback());
    parts.push("");
    continue;
  }
  const svg = fs.readFileSync(path.join(ICONS_DIR, `${file}.svg`), "utf8");
  parts.push(renderComponent(exportName, svg));
  parts.push("");
}

parts.push(renderLogo());
parts.push("");

for (const [file, exportName] of Object.entries(VARIANT_MAP)) {
  const svg = fs.readFileSync(path.join(ICONS_DIR, "variants", `${file}.svg`), "utf8");
  parts.push(renderComponent(exportName, svg));
  parts.push("");
}

fs.writeFileSync(OUT, `${parts.join("\n").trimEnd()}\n`);
console.log(`Wrote ${OUT}`);
