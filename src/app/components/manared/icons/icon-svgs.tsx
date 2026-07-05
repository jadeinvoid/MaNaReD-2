import type { SVGProps } from "react";

type IconSvgProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function FilterIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 20 19" fill="none" aria-hidden {...props}>
      <path
        d="M1 3h18M5 10h10M8 17h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CompoundIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 12h2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function OrganismIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 24 10" fill="none" aria-hidden {...props}>
      <ellipse cx="12" cy="5" rx="10" ry="3.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ProfileIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExploreIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function WorkspaceIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function OverviewIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 12 16" fill="none" aria-hidden {...props}>
      <path d="M6 2v12M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 12 16" fill="none" aria-hidden {...props}>
      <path
        d="M6 14V2M2 10l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExpandIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function VerticalCollapseIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <path d="M8 12l8 8 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function RemoveIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 8 8" fill="none" aria-hidden {...props}>
      <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function LogoIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.15" />
      <text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">
        M
      </text>
    </svg>
  );
}

export function ChevronRightIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NoFilterIcon(props: IconSvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
