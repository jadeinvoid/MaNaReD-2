import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentType, SVGProps } from "react";

import { DocsPage } from "../../astryx/shared/docs-page";
import {
  ExpandIcon,
  ExpandLeftActiveIcon,
  ExpandLeftDefaultIcon,
  ExpandLeftHoverIcon,
  ExpandRightActiveIcon,
  ExpandRightHoverIcon,
  IconStateDefaultAIcon,
  IconStateFocusedAIcon,
  IconStateFocusedBIcon,
  IconStateHoverAIcon,
  IconStateHoverBIcon,
  VerticalCollapseExpandIcon,
  VerticalCollapseIcon,
} from "@/app/components/manared/icons/icon-svgs";
import {
  MANARED_ICONS_12,
  MANARED_ICONS_16,
  MANARED_ICONS_24,
  MANARED_ICONS_32,
  MaNaReDIcon,
  type MaNaReDIconName,
} from "@/app/components/manared/icons/manared-icon";

const FIGMA_ICONS = "https://www.figma.com/design/y12p7ety9bAbG9Z7m5Bd6L/MaNaReD?node-id=93-1469";

type CatalogEntry = {
  label: string;
  render: ComponentType<SVGProps<SVGSVGElement>>;
  sizeClass: string;
};

function IconGrid({ title, entries }: { title: string; entries: CatalogEntry[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-primary">{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        {entries.map(({ label, render: Icon, sizeClass }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-lg border border-emphasized bg-surface p-4"
          >
            <Icon className={`shrink-0 text-secondary ${sizeClass}`} aria-hidden />
            <span className="text-2xs text-secondary text-center">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MaNaReDIconGrid({
  title,
  icons,
  size,
}: {
  title: string;
  icons: readonly MaNaReDIconName[];
  size: 12 | 16 | 24 | 32;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-primary">{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        {icons.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-lg border border-emphasized bg-surface p-4"
          >
            <MaNaReDIcon name={name} size={size} label={name} />
            <span className="text-2xs text-secondary text-center">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const expandVariants: CatalogEntry[] = [
  { label: "expand / right / default", render: ExpandIcon, sizeClass: "h-6 w-6" },
  { label: "expand / right / hover", render: ExpandRightHoverIcon, sizeClass: "h-6 w-6" },
  { label: "expand / right / active", render: ExpandRightActiveIcon, sizeClass: "h-6 w-6" },
  { label: "expand / left / default", render: ExpandLeftDefaultIcon, sizeClass: "h-6 w-6" },
  { label: "expand / left / hover", render: ExpandLeftHoverIcon, sizeClass: "h-6 w-6" },
  { label: "expand / left / active", render: ExpandLeftActiveIcon, sizeClass: "h-6 w-6" },
];

const collapseVariants: CatalogEntry[] = [
  { label: "vertical-collapse / collapse", render: VerticalCollapseIcon, sizeClass: "h-8 w-8" },
  { label: "vertical-collapse / expand", render: VerticalCollapseExpandIcon, sizeClass: "h-8 w-8" },
];

const directionIcons = [
  "chevron-up",
  "chevron-down",
  "chevron-left",
  "chevron-right",
] as const satisfies readonly MaNaReDIconName[];

const stateVariants: CatalogEntry[] = [
  { label: "state / default (bookmark)", render: IconStateDefaultAIcon, sizeClass: "h-6 w-6" },
  { label: "state / hover (bookmark)", render: IconStateHoverAIcon, sizeClass: "h-6 w-6" },
  { label: "state / focused (bookmark)", render: IconStateFocusedAIcon, sizeClass: "h-6 w-6" },
  { label: "state / hover (upload)", render: IconStateHoverBIcon, sizeClass: "h-6 w-6" },
  { label: "state / focused (upload)", render: IconStateFocusedBIcon, sizeClass: "h-6 w-6" },
];

const meta = {
  title: "MaNaReD/Foundations/Icons",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_ICONS },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeTiers: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Icons — Size tiers"
      description="Custom symbols from the Figma UI Library (node 93:1469), exported via Figma MCP."
    >
      <MaNaReDIconGrid title="12px" icons={MANARED_ICONS_12} size={12} />
      <MaNaReDIconGrid title="16px" icons={MANARED_ICONS_16} size={16} />
      <MaNaReDIconGrid title="24px" icons={MANARED_ICONS_24} size={24} />
      <MaNaReDIconGrid title="32px" icons={MANARED_ICONS_32} size={32} />
    </DocsPage>
  ),
};

export const Variants: Story = {
  render: () => (
    <DocsPage
      title="MaNaReD Icons — Variants"
      description="Expand, collapse, direction, move, and interactive state sets from the UI Library."
    >
      <IconGrid title="Expand" entries={expandVariants} />
      <IconGrid title="Vertical collapse" entries={collapseVariants} />
      <MaNaReDIconGrid title="Direction (24px)" icons={directionIcons} size={24} />
      <MaNaReDIconGrid title="Move (12px)" icons={MANARED_ICONS_12} size={12} />
      <IconGrid title="Interactive states" entries={stateVariants} />
    </DocsPage>
  ),
};
