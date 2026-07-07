import { Divider } from "@astryxdesign/core/Divider";
import { Heading, Text } from "@astryxdesign/core/Text";

export type DetailTaxonomyItemProps = {
  label: string;
  active?: boolean;
};

export function DetailTaxonomyItem({ label, active = false }: DetailTaxonomyItemProps) {
  return (
    <Text
      size="2xs"
      weight={active ? "semibold" : undefined}
      className="rounded-md p-1 font-mono capitalize text-inherit"
    >
      {label}
    </Text>
  );
}

export type DetailIdentityIdProps = {
  children: string;
};

export function DetailIdentityId({ children }: DetailIdentityIdProps) {
  return (
    <Text size="2xs" color="secondary" className="font-mono uppercase">
      {children}
    </Text>
  );
}

export type DetailIdentityNameProps = {
  children: string;
};

export function DetailIdentityName({ children }: DetailIdentityNameProps) {
  return <Heading level={2}>{children}</Heading>;
}

export type DetailSubcategoryTitleProps = {
  children: string;
};

export function DetailSubcategoryTitle({ children }: DetailSubcategoryTitleProps) {
  return (
    <Text size="sm" weight="medium" className="text-primary">
      {children}
    </Text>
  );
}

export type DetailCountProps = {
  count: number;
  label?: string;
};

export function DetailCount({ count, label = "records" }: DetailCountProps) {
  return (
    <Text size="sm" weight="bold" className="text-primary">
      {count} {label}
    </Text>
  );
}

export type DetailCategoryDividerProps = {
  title: string;
};

export function DetailCategoryDivider({ title }: DetailCategoryDividerProps) {
  return <Divider label={title} variant="subtle" className="py-2" />;
}

export type DetailPictureProps = {
  alt: string;
  src?: string;
};

export function DetailPicture({ alt, src }: DetailPictureProps) {
  return (
    <div className="flex h-40 w-72 items-center justify-center overflow-hidden rounded-lg bg-muted">
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <Text size="2xs" color="secondary">
          {alt}
        </Text>
      )}
    </div>
  );
}
