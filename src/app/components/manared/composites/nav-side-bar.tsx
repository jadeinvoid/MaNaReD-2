"use client";

import { useState } from "react";
import { Text } from "@astryxdesign/core/Text";

import { MaNaReDIcon, type MaNaReDIconName } from "../icons/manared-icon";
import {
  BUTTON_ELEVATION_HOVER,
  INTERACTIVE_NAV_ITEM,
  INTERACTIVE_NAV_ITEM_ACTIVE,
} from "../primitives/interactive-styles";
import { GRADIENT_SIDEBAR, NAV_SIDEBAR_SHELL } from "../primitives/gradient-styles";

export type NavSideBarProps = {
  activeItem?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
};

const exploreItems = ["Compound", "Organism", "Region"] as const;
const workspaceItems = ["My Library", "Compare", "Export"] as const;

function NavSidebarReveal({
  collapsed,
  children,
}: {
  collapsed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="nav-sidebar-reveal"
      data-collapsed={collapsed ? "true" : "false"}
      aria-hidden={collapsed}
    >
      <div className="nav-sidebar-reveal-inner">{children}</div>
    </div>
  );
}

function NavCategory({
  label,
  icon,
  collapsed,
}: {
  label: string;
  icon: MaNaReDIconName;
  collapsed?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center py-1 text-primary drop-shadow-[0_4px_2.4px_rgba(0,0,0,0.17)] ${
        collapsed ? "h-10 justify-center px-0" : "gap-4 px-4"
      }`}
    >
      <MaNaReDIcon
        name={icon}
        size={16}
        className="text-current"
        label={collapsed ? label : undefined}
      />
      <Text
        size="base"
        weight="bold"
        className={`overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-[var(--duration-fast,175ms)] ease-[var(--ease-standard,ease)] ${
          collapsed ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100"
        }`}
        aria-hidden={collapsed}
      >
        {label}
      </Text>
    </div>
  );
}

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={active ? INTERACTIVE_NAV_ITEM_ACTIVE : INTERACTIVE_NAV_ITEM}
    >
      {label}
    </button>
  );
}

/** Primary navigation sidebar from Figma `nav-side-bar-light|dark` (339:3237 / 339:3284). */
export function NavSideBar({
  activeItem = "Compound",
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
}: NavSideBarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  const setCollapsed = (next: boolean) => {
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const shellClass = [
    GRADIENT_SIDEBAR,
    NAV_SIDEBAR_SHELL,
    "shadow-nav-sidebar",
    "flex min-h-screen flex-col gap-6 self-stretch overflow-hidden rounded-tr-lg rounded-br-lg p-4",
  ].join(" ");

  return (
    <aside className={shellClass} data-collapsed={collapsed ? "true" : "false"}>
      <header
        className={`flex w-full flex-col justify-center text-primary ${
          collapsed ? "items-center" : "items-end"
        }`}
        data-name="nav-side-bar/header"
      >
        <button
          type="button"
          className={`flex size-6 items-center justify-center rounded-md ${BUTTON_ELEVATION_HOVER} focus-visible:outline-none focus-visible:bg-nav-focus`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
        >
          <MaNaReDIcon
            name={collapsed ? "expand" : "expand-left"}
            size={24}
            className="text-current"
          />
        </button>
      </header>

      <div
        className="flex h-[120px] w-full shrink-0 items-center justify-center rounded-md text-primary"
        data-name="logo"
      >
        <NavSidebarReveal collapsed={collapsed}>
          <MaNaReDIcon name="logo" size={32} className="text-current" label="MaNaReD logo" />
        </NavSidebarReveal>
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-col gap-6"
        aria-label="Primary"
        data-name="nav-side-bar/content"
      >
        <NavCategory label="Overview" icon="overview" collapsed={collapsed} />

        <div className={`flex flex-col ${collapsed ? "gap-0" : "gap-4"}`}>
          <NavCategory label="Explore" icon="explore" collapsed={collapsed} />
          <NavSidebarReveal collapsed={collapsed}>
            <div className="flex flex-col gap-3">
              {exploreItems.map((item) => (
                <NavItem key={item} label={item} active={item === activeItem} />
              ))}
            </div>
          </NavSidebarReveal>
        </div>

        <div className={`flex flex-col ${collapsed ? "gap-0" : "gap-4"}`}>
          <NavCategory label="Workspace" icon="workspace" collapsed={collapsed} />
          <NavSidebarReveal collapsed={collapsed}>
            <div className="flex flex-col gap-3">
              {workspaceItems.map((item) => (
                <NavItem key={item} label={item} active={item === activeItem} />
              ))}
            </div>
          </NavSidebarReveal>
        </div>
      </nav>
    </aside>
  );
}
