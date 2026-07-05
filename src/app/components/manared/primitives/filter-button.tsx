import { Button } from "@astryxdesign/core/Button";

export type FilterButtonVariant = "refine-result" | "clear-all" | "apply-filter";

export type FilterButtonProps = {
  variant: FilterButtonVariant;
  onClick?: () => void;
};

const labels: Record<FilterButtonVariant, string> = {
  "refine-result": "Refine Results",
  "clear-all": "Clear all",
  "apply-filter": "Apply filters",
};

/** Filter sidebar action buttons wrapping Astryx Button. */
export function FilterButton({ variant, onClick }: FilterButtonProps) {
  const label = labels[variant];
  const astryxVariant = variant === "apply-filter" ? "primary" : "secondary";

  return (
    <Button
      label={label}
      variant={astryxVariant}
      onClick={onClick}
      className={variant === "clear-all" ? "text-sm" : undefined}
    />
  );
}
