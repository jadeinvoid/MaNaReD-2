import { MaNaReDIcon } from "../icons/manared-icon";

export type FilterRowProps = {
  label: string;
};

/** Single filter category row in the sidebar — Figma `filter/category` (349:4572). */
export function FilterRow({ label }: FilterRowProps) {
  return (
    <div className="flex w-full items-center justify-end gap-1 overflow-hidden pl-2 pr-1">
      <span className="px-2 py-1 text-3xs uppercase text-primary">{label}</span>
      <MaNaReDIcon name="chevron-down" size={24} className="text-primary" label="Expand filter" />
    </div>
  );
}

export const DEFAULT_FILTER_ROWS = [
  "Taxonomy",
  "Molecular Weight",
  "Compound Class",
  "Geographic Region",
  "Bioactivity",
  "Target / assay",
] as const;
