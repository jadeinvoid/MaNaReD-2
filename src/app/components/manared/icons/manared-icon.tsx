import type { ComponentType, SVGProps } from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  CompoundIcon,
  ExpandIcon,
  ExploreIcon,
  FilterIcon,
  LogoIcon,
  NoFilterIcon,
  OrganismIcon,
  OverviewIcon,
  ProfileIcon,
  RemoveIcon,
  SearchIcon,
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
  | "expand"
  | "vertical-collapse"
  | "remove"
  | "logo"
  | "chevron-right"
  | "no-filter";

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
  expand: ExpandIcon,
  "vertical-collapse": VerticalCollapseIcon,
  remove: RemoveIcon,
  logo: LogoIcon,
  "chevron-right": ChevronRightIcon,
  "no-filter": NoFilterIcon,
};

const SIZE_CLASS = {
  16: "h-4 w-4",
  24: "h-6 w-6",
  32: "h-8 w-8",
} as const;

export type MaNaReDIconProps = {
  name: MaNaReDIconName;
  size?: 16 | 24 | 32;
  className?: string;
  label?: string;
};

/** Renders a MaNaReD custom icon symbol at 16, 24, or 32px. */
export function MaNaReDIcon({ name, size = 24, className = "", label }: MaNaReDIconProps) {
  const Icon = ICON_MAP[name];
  const sizeClass = SIZE_CLASS[size];

  return (
    <Icon
      className={`shrink-0 text-secondary ${sizeClass} ${className}`.trim()}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

export const MANARED_ICON_NAMES = Object.keys(ICON_MAP) as MaNaReDIconName[];
