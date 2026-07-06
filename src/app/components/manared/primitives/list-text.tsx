import { LIST_TEXT_ID, LIST_TEXT_LABEL, LIST_TEXT_TITLE } from "./list-text-styles";

export type ListIdProps = {
  children: string;
};

/** Compact ID label in list rows — Figma `list-id` (`203:1355`). */
export function ListId({ children }: ListIdProps) {
  return <span className={LIST_TEXT_ID}>{children}</span>;
}

export type ListTitleProps = {
  children: string;
};

/** Primary title in list rows — Figma `list-title` (`203:1356`). */
export function ListTitle({ children }: ListTitleProps) {
  return <span className={LIST_TEXT_TITLE}>{children}</span>;
}

export type ListLabelProps = {
  /** Combined label copy (e.g. `MW 421.5`). */
  children?: string;
  /** Numeric value — Figma `list-label` number slot. */
  number?: string;
  /** Unit suffix — Figma `list-label` unit slot. */
  unit?: string;
};

/** Trailing metadata in list rows — Figma `list-label` (`203:1278`). */
export function ListLabel({ children, number, unit }: ListLabelProps) {
  if (number != null && unit != null) {
    return (
      <span className={LIST_TEXT_LABEL}>
        <span>{number}</span>
        <span>{unit}</span>
      </span>
    );
  }

  return <span className={LIST_TEXT_LABEL}>{children}</span>;
}

/** Demo row combining list text primitives for Storybook. */
export function ListTextRow({
  id,
  title,
  label,
  labelNumber,
  labelUnit,
}: {
  id: string;
  title: string;
  label?: string;
  labelNumber?: string;
  labelUnit?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <ListId>{id}</ListId>
      <ListTitle>{title}</ListTitle>
      {labelNumber != null && labelUnit != null ? (
        <ListLabel number={labelNumber} unit={labelUnit} />
      ) : (
        <ListLabel>{label ?? ""}</ListLabel>
      )}
    </div>
  );
}
