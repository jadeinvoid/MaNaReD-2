import { MaNaReDIcon } from "../icons/manared-icon";
import { INTERACTIVE_CHIP_BAR_CONTROL } from "../primitives/interactive-styles";

export type SortWrapperProps = {
  label?: string;
  onClick?: () => void;
};

/** Sort dropdown trigger from Figma `sort-wrapper/compound`. */
export function SortWrapper({ label = "Sort by: Relevance", onClick }: SortWrapperProps) {
  return (
    <button type="button" onClick={onClick} className={INTERACTIVE_CHIP_BAR_CONTROL}>
      {label}
      <MaNaReDIcon name="arrow-down" size={16} />
    </button>
  );
}
