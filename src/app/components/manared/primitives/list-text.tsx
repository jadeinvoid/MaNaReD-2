import { Text } from "@astryxdesign/core/Text";

export type ListIdProps = {
  children: string;
};

/** Compact ID label in list rows (Figma `list-id`). */
export function ListId({ children }: ListIdProps) {
  return (
    <Text size="2xs" color="secondary" className="font-mono uppercase tracking-wide">
      {children}
    </Text>
  );
}

export type ListTitleProps = {
  children: string;
};

/** Primary title in list rows (Figma `list-title`). */
export function ListTitle({ children }: ListTitleProps) {
  return (
    <Text size="sm" weight="medium" className="text-primary">
      {children}
    </Text>
  );
}

export type ListLabelProps = {
  children: string;
};

/** Trailing metadata label in list rows (Figma `list-label`). */
export function ListLabel({ children }: ListLabelProps) {
  return (
    <Text size="2xs" color="secondary" className="rounded-md bg-muted px-2 py-1">
      {children}
    </Text>
  );
}

/** Demo row combining list text primitives for Storybook. */
export function ListTextRow({ id, title, label }: { id: string; title: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <ListId>{id}</ListId>
      <ListTitle>{title}</ListTitle>
      <ListLabel>{label}</ListLabel>
    </div>
  );
}
