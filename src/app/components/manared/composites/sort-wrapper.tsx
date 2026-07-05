import { Button } from "@astryxdesign/core/Button";

import { MaNaReDIcon } from "../icons/manared-icon";

export type SortWrapperProps = {
  label?: string;
  onClick?: () => void;
};

/** Sort dropdown trigger from Figma `sort-wrapper/compound`. */
export function SortWrapper({ label = "Sort by: Relevance", onClick }: SortWrapperProps) {
  return (
    <Button
      label={label}
      variant="secondary"
      size="sm"
      onClick={onClick}
      endContent={<MaNaReDIcon name="arrow-down" size={16} />}
      className="text-2xs"
    />
  );
}
