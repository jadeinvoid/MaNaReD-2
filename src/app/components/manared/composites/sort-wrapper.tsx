import { MaNaReDIcon } from "../icons/manared-icon";

export type SortWrapperProps = {
  label?: string;
  onClick?: () => void;
};

/** Sort dropdown trigger from Figma `sort-wrapper/compound`. */
export function SortWrapper({ label = "Sort by: Relevance", onClick }: SortWrapperProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-7 items-center gap-2 rounded-lg border border-emphasized bg-surface px-3 text-xs text-secondary hover:bg-muted"
    >
      {label}
      <MaNaReDIcon name="arrow-down" size={16} />
    </button>
  );
}
