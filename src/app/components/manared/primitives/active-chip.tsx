import { Badge } from "@astryxdesign/core/Badge";
import { HStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";

export type ActiveChipProps = {
  label: string;
  onRemove?: () => void;
};

/** Removable filter chip from Figma `active-chip` symbol. */
export function ActiveChip({ label, onRemove }: ActiveChipProps) {
  return (
    <HStack
      gap={1}
      vAlign="center"
      className="h-6 overflow-hidden rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-interactive-chip-active)] px-2 py-1 hover:bg-[var(--color-interactive-chip-hover)]"
    >
      <Badge
        label={label}
        variant="neutral"
        className="h-auto border-0 bg-transparent p-0 text-2xs tracking-tight text-secondary shadow-none"
      />
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center text-secondary hover:text-primary"
          aria-label={`Remove ${label}`}
        >
          <MaNaReDIcon name="remove" size={16} />
        </button>
      ) : (
        <MaNaReDIcon name="remove" size={16} />
      )}
    </HStack>
  );
}
