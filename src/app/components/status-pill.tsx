const statusStyles = {
  success: {
    wrap: "bg-success/10",
    dot: "bg-success",
    text: "text-success",
  },
  error: {
    wrap: "bg-error/10",
    dot: "bg-error",
    text: "text-error",
  },
  warning: {
    wrap: "bg-warning/10",
    dot: "bg-warning",
    text: "text-warning",
  },
} as const;

export type StatusPillProps = {
  /** Semantic status that drives token colors. */
  status: keyof typeof statusStyles;
  /** Visible label next to the status dot. */
  label: string;
};

/** Compact status indicator using token-backed success/error/warning colors. */
export function StatusPill({ status, label }: StatusPillProps) {
  const styles = statusStyles[status];

  return (
    <div className={`flex items-center gap-2 rounded-md px-3 py-2 ${styles.wrap}`}>
      <div className={`h-2 w-2 rounded-full ${styles.dot}`} />
      <span className={`text-sm font-medium ${styles.text}`}>{label}</span>
    </div>
  );
}
