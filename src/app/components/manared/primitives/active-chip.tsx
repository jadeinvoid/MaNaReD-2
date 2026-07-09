import { MaNaReDIcon } from "../icons/manared-icon";
import { INTERACTIVE_ACTIVE_CHIP, INTERACTIVE_CHIP_REMOVE } from "./interactive-styles";

export type ActiveChipProps = {
  label: string;
  title?: string;
  onRemove?: () => void;
  onClick?: () => void;
};

/** Removable filter chip from Figma `active-chip` symbol (332:9082). */
export function ActiveChip({ label, title, onRemove, onClick }: ActiveChipProps) {
  const chipClass = onClick ? `${INTERACTIVE_ACTIVE_CHIP} cursor-pointer` : INTERACTIVE_ACTIVE_CHIP;

  const labelContent = onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="translate-y-px whitespace-nowrap border-0 bg-transparent p-0 text-inherit"
    >
      {label}
    </button>
  ) : (
    <span className="translate-y-px whitespace-nowrap">{label}</span>
  );

  return (
    <span className={chipClass} title={title}>
      {labelContent}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className={INTERACTIVE_CHIP_REMOVE}
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
