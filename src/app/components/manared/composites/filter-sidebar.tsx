import { VStack } from "@astryxdesign/core/Layout";

import { MaNaReDIcon } from "../icons/manared-icon";
import { FilterButton } from "../primitives/filter-button";
import { DEFAULT_FILTER_ROWS, FilterRow } from "./filter-row";

export type FilterSidebarProps = {
  collapsed?: boolean;
  onApply?: () => void;
  onClear?: () => void;
};

/** Filter sidebar from Figma `filter/side-bar`. */
export function FilterSidebar({ collapsed = false, onApply, onClear }: FilterSidebarProps) {
  return (
    <aside className="flex w-70 flex-col gap-4 rounded-lg border border-emphasized bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="flex-1" />
        <MaNaReDIcon name="expand" size={32} />
      </div>

      {!collapsed && (
        <>
          <div className="flex items-center justify-between gap-2">
            <FilterButton variant="refine-result" />
            <FilterButton variant="clear-all" onClick={onClear} />
          </div>

          <VStack gap={1} className="flex-1">
            {DEFAULT_FILTER_ROWS.map((label) => (
              <FilterRow key={label} label={label} />
            ))}
          </VStack>

          <div className="flex items-center justify-between border-t border-emphasized pt-3">
            <MaNaReDIcon name="vertical-collapse" size={32} />
            <FilterButton variant="apply-filter" onClick={onApply} />
          </div>
        </>
      )}
    </aside>
  );
}
