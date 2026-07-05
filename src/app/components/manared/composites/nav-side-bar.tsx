import { VStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";

import { MaNaReDIcon } from "../icons/manared-icon";

export type NavSideBarProps = {
  activeItem?: string;
};

const exploreItems = ["Compound", "Organism", "Geographic Region"];
const workspaceItems = ["My Library", "Compare", "Export"];

function NavItem({
  label,
  active,
  icon,
}: {
  label: string;
  active?: boolean;
  icon: "compound" | "explore" | "workspace" | "overview";
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${
        active ? "bg-muted font-medium text-primary" : "text-secondary hover:bg-muted/60"
      }`}
    >
      <MaNaReDIcon name={icon} size={16} />
      {label}
    </button>
  );
}

/** Primary navigation sidebar from Figma `MaNaReD` nav-side-bar symbol. */
export function NavSideBar({ activeItem = "Compound" }: NavSideBarProps) {
  return (
    <aside className="flex h-full w-60 flex-col gap-4 rounded-lg bg-[var(--color-background-sidebar)] p-4">
      <Text size="lg" weight="bold" className="px-2 py-4 text-primary">
        MaNaReD
      </Text>

      <VStack gap={1}>
        <NavItem label="Overview" icon="overview" />
        <Text size="2xs" weight="medium" color="secondary" className="px-3 pt-4 uppercase">
          Explore
        </Text>
        {exploreItems.map((item) => (
          <NavItem
            key={item}
            label={item}
            active={item === activeItem}
            icon={item === "Compound" ? "compound" : "explore"}
          />
        ))}
        <Text size="2xs" weight="medium" color="secondary" className="px-3 pt-4 uppercase">
          Workspace
        </Text>
        {workspaceItems.map((item) => (
          <NavItem key={item} label={item} icon="workspace" />
        ))}
      </VStack>
    </aside>
  );
}
