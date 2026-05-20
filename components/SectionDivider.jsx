export default function SectionDivider({ variant = "" }) {
  return (
    <div className={"divider " + variant} aria-hidden="true">
      <span className="line" />
      <span className="dot" />
      <span className="stem" />
      <span className="diamond hollow" />
      <span className="diamond" />
      <span className="diamond hollow" />
      <span className="stem" />
      <span className="dot" />
      <span className="line right" />
    </div>
  );
}
