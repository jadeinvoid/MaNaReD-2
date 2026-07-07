import { FilterButton } from "../primitives/filter-button";
import { GRADIENT_FILTER } from "../primitives/gradient-styles";
import { DEFAULT_FILTER_ROWS, FilterRow } from "./filter-row";

export type FilterSidebarProps = {
  onClear?: () => void;
};

/** Filter sidebar from Figma `filter/container` (349:4572). */
export function FilterSidebar({ onClear }: FilterSidebarProps) {
  return (
    <aside
      className={`${GRADIENT_FILTER} flex h-full min-h-0 shrink-0 flex-col gap-1 rounded-md px-1 py-4 backdrop-blur-[2px]`}
    >
      {DEFAULT_FILTER_ROWS.map((label) => (
        <FilterRow key={label} label={label} />
      ))}

      <div className="min-h-0 flex-1" aria-hidden />

      <div className="flex w-full justify-end">
        <FilterButton variant="clear-all" onClick={onClear} />
      </div>
    </aside>
  );
}
