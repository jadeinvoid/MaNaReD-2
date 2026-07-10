import type { ComponentType, SVGProps } from "react";

import { getIconStrokeWidth, type IconDisplaySize } from "./icon-stroke";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CompoundIcon,
  ExpandIcon,
  ExpandLeftDefaultIcon,
  ExploreIcon,
  FilterIcon,
  LogoIcon,
  MoveLeftIcon,
  MoveRightIcon,
  NoFilterIcon,
  OrganismIcon,
  OverviewIcon,
  ProfileIcon,
  RemoveIcon,
  SearchIcon,
  CardViewIcon,
  ListViewIcon,
  VerticalCollapseIcon,
  WorkspaceIcon,
} from "./icon-svgs";

/** MaNaReD custom icon names from Figma UI Library (node 93:1469). */
export type MaNaReDIconName =
  | "search"
  | "filter"
  | "compound"
  | "organism"
  | "profile"
  | "explore"
  | "workspace"
  | "overview"
  | "arrow-up"
  | "arrow-down"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "move-left"
  | "move-right"
  | "expand"
  | "expand-left"
  | "vertical-collapse"
  | "remove"
  | "logo"
  | "no-filter"
  | "card-view"
  | "list-view";

const ICON_MAP: Record<MaNaReDIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  search: SearchIcon,
  filter: FilterIcon,
  compound: CompoundIcon,
  organism: OrganismIcon,
  profile: ProfileIcon,
  explore: ExploreIcon,
  workspace: WorkspaceIcon,
  overview: OverviewIcon,
  "arrow-up": ArrowUpIcon,
  "arrow-down": ArrowDownIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "move-left": MoveLeftIcon,
  "move-right": MoveRightIcon,
  expand: ExpandIcon,
  "expand-left": ExpandLeftDefaultIcon,
  "vertical-collapse": VerticalCollapseIcon,
  remove: RemoveIcon,
  logo: LogoIcon,
  "no-filter": NoFilterIcon,
  "card-view": CardViewIcon,
  "list-view": ListViewIcon,
};

const SIZE_CLASS = {
  8: "h-2 w-2",
  12: "h-3 w-3",
  16: "h-4 w-4",
  24: "h-6 w-6",
  32: "h-8 w-8",
} as const;

export type MaNaReDIconProps = {
  name: MaNaReDIconName;
  size?: IconDisplaySize;
  className?: string;
  label?: string;
};

/** Renders a MaNaReD custom icon symbol at 8, 12, 16, 24, or 32px. */
export function MaNaReDIcon({ name, size = 24, className = "", label }: MaNaReDIconProps) {
  const Icon = ICON_MAP[name];
  const sizeClass = SIZE_CLASS[size];
  const strokeWidth = getIconStrokeWidth(size);
  const hasExplicitTextColor = /\b!?text-/.test(className);
  const toneClass = hasExplicitTextColor ? "" : "text-secondary";

  return (
    <Icon
      className={`shrink-0 ${toneClass} ${sizeClass} ${className}`.trim()}
      strokeWidth={strokeWidth}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

export { getIconStrokeWidth, ICON_STROKE_BASE_PX, ICON_STROKE_REFERENCE_SIZE } from "./icon-stroke";
export type { IconDisplaySize } from "./icon-stroke";

export const MANARED_ICON_NAMES = Object.keys(ICON_MAP) as MaNaReDIconName[];

/** Canonical Figma size tiers (node 93:1469). */
export const MANARED_ICONS_16 = [
  "search",
  "filter",
  "arrow-up",
  "arrow-down",
  "workspace",
  "explore",
  "overview",
  "remove",
  "card-view",
  "list-view",
] as const satisfies readonly MaNaReDIconName[];

export const MANARED_ICONS_8 = ["remove"] as const satisfies readonly MaNaReDIconName[];

export const MANARED_ICONS_12 = [
  "move-left",
  "move-right",
] as const satisfies readonly MaNaReDIconName[];

export const MANARED_ICONS_24 = [
  "compound",
  "organism",
  "no-filter",
  "expand",
  "expand-left",
  "chevron-up",
  "chevron-down",
  "chevron-left",
  "chevron-right",
] as const satisfies readonly MaNaReDIconName[];

export const MANARED_ICONS_32 = [
  "profile",
  "vertical-collapse",
  "logo",
] as const satisfies readonly MaNaReDIconName[];
