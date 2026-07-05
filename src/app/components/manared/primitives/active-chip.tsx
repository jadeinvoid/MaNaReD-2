import { MaNaReDIcon } from "../icons/manared-icon";

export type ActiveChipProps = {
  label: string;
  onRemove?: () => void;
};

const ACTIVE_CHIP_LAYOUT =
  "inline-flex h-6 shrink-0 items-center gap-2 overflow-hidden rounded-lg border border-solid border-[var(--color-border-secondary)] bg-[var(--color-interactive-chip-active)] px-[length:var(--spacing-2)] py-[length:var(--spacing-1)] text-3xs font-normal leading-4 tracking-[-0.12px] text-secondary hover:bg-[var(--color-interactive-chip-hover)]";

/** Removable filter chip from Figma `active-chip` symbol (332:9082). */
export function ActiveChip({ label, onRemove }: ActiveChipProps) {
  return (
    <span className={ACTIVE_CHIP_LAYOUT}>
      <span className="whitespace-nowrap">{label}</span>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="flex shrink-0 items-center justify-center text-secondary hover:text-primary"
          aria-label={`Remove ${label}`}
        >
          <MaNaReDIcon name="remove" size={8} />
        </button>
      ) : (
        <MaNaReDIcon name="remove" size={8} />
      )}
    </span>
  );
}
