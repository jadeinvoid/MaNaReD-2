import { Text } from "@astryxdesign/core/Text";

import { MaNaReDIcon, type MaNaReDIconName } from "../icons/manared-icon";
import { GRADIENT_SIDEBAR, NAV_SIDEBAR_SHELL } from "../primitives/gradient-styles";

export type NavSideBarProps = {
  activeItem?: string;
};

const exploreItems = ["Compound", "Organism", "Region"] as const;
const workspaceItems = ["My Library", "Compare", "Export"] as const;

const NAV_SHELL = [
  GRADIENT_SIDEBAR,
  NAV_SIDEBAR_SHELL,
  "shadow-nav-sidebar",
  "flex h-full min-h-screen flex-col gap-6 overflow-hidden rounded-tr-lg rounded-br-lg p-4",
].join(" ");

function NavCategory({ label, icon }: { label: string; icon: MaNaReDIconName }) {
  return (
    <div className="flex w-full items-center gap-4 px-4 py-1 drop-shadow-[0_4px_2.4px_rgba(0,0,0,0.17)]">
      <MaNaReDIcon name={icon} size={16} className="text-primary" />
      <Text size="base" weight="bold" className="text-primary">
        {label}
      </Text>
    </div>
  );
}

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`h-6 w-full rounded-md py-2 pl-10 pr-2 text-left text-2xs font-semibold tracking-[0.24px] ${
        active
          ? "bg-nav-active text-primary"
          : "text-primary hover:bg-nav-hover focus-visible:bg-nav-focus"
      }`}
    >
      {label}
    </button>
  );
}

/** Primary navigation sidebar from Figma `nav-side-bar-light|dark` (339:3237 / 339:3284). */
export function NavSideBar({ activeItem = "Compound" }: NavSideBarProps) {
  return (
    <aside className={NAV_SHELL}>
      <header
        className="flex w-full flex-col items-end justify-center"
        data-name="nav-side-bar/header"
      >
        <MaNaReDIcon name="expand" size={24} className="text-primary" label="Collapse sidebar" />
      </header>

      <div
        className="flex h-[120px] w-full shrink-0 items-center justify-center rounded-md"
        data-name="logo"
      >
        <MaNaReDIcon name="logo" size={32} className="text-primary" label="MaNaReD logo" />
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-col gap-6"
        aria-label="Primary"
        data-name="nav-side-bar/content"
      >
        <NavCategory label="Overview" icon="overview" />

        <div className="flex flex-col gap-4">
          <NavCategory label="Explore" icon="explore" />
          <div className="flex flex-col gap-3">
            {exploreItems.map((item) => (
              <NavItem key={item} label={item} active={item === activeItem} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <NavCategory label="Workspace" icon="workspace" />
          <div className="flex flex-col gap-3">
            {workspaceItems.map((item) => (
              <NavItem key={item} label={item} active={item === activeItem} />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
