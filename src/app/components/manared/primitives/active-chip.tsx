import { MaNaReDIcon } from "../icons/manared-icon";
import { INTERACTIVE_ACTIVE_CHIP, INTERACTIVE_CHIP_REMOVE } from "./interactive-styles";

export type ActiveChipProps = {
  label: string;
  onRemove?: () => void;
};

/** Removable filter chip from Figma `active-chip` symbol (332:9082). */
export function ActiveChip({ label, onRemove }: ActiveChipProps) {
  return (
    <span className={INTERACTIVE_ACTIVE_CHIP}>
      <span className="whitespace-nowrap">{label}</span>
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
