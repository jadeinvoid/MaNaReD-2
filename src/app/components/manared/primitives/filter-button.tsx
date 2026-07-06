import {
  INTERACTIVE_FILTER_APPLY,
  INTERACTIVE_FILTER_CLEAR_ALL,
  INTERACTIVE_FILTER_REFINE_LABEL,
} from "./interactive-styles";

export type FilterButtonVariant = "refine-result" | "clear-all" | "apply-filter";

export type FilterButtonProps = {
  variant: FilterButtonVariant;
  onClick?: () => void;
};

const labels: Record<FilterButtonVariant, string> = {
  "refine-result": "Refine Results",
  "clear-all": "Clear All",
  "apply-filter": "Apply Filter",
};

const variantClassNames: Record<FilterButtonVariant, string> = {
  "refine-result": INTERACTIVE_FILTER_REFINE_LABEL,
  "clear-all": INTERACTIVE_FILTER_CLEAR_ALL,
  "apply-filter": INTERACTIVE_FILTER_APPLY,
};

/** Filter sidebar actions from Figma button symbols (332:9066 header, 332:9068, 332:9079). */
export function FilterButton({ variant, onClick }: FilterButtonProps) {
  const label = labels[variant];
  const className = variantClassNames[variant];

  if (variant === "refine-result" && !onClick) {
    return <span className={className}>{label}</span>;
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
}
