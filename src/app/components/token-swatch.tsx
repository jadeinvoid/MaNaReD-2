export type TokenSwatchProps = {
  /** Token utility class name shown as the label (e.g. `bg-surface`). */
  token: string;
  /** Short note about when to use this token. */
  description: string;
  /** Background utility applied to the swatch (usually the token itself). */
  className: string;
};

/** Small card that demos a design-token background utility. */
export function TokenSwatch({ token, description, className }: TokenSwatchProps) {
  return (
    <div className={`rounded-lg p-4 shadow-sm ${className}`}>
      <p className="text-sm font-medium text-primary">{token}</p>
      <p className="text-xs text-secondary">{description}</p>
    </div>
  );
}
