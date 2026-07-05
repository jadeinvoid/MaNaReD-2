import { MaNaReDIcon } from "../icons/manared-icon";

export type ActiveChipProps = {
  label: string;
  onRemove?: () => void;
};

/** Removable filter chip from Figma `active-chip` symbol. */
export function ActiveChip({ label, onRemove }: ActiveChipProps) {
  return (
    <span className="inline-flex h-6 items-center gap-2 overflow-hidden rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-interactive-chip-active)] px-2 py-1 text-xs tracking-tight text-secondary">
      {label}
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
    </span>
  );
}
