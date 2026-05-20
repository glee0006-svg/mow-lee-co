export default function Credentials({ variant = "" }) {
  return (
    <div className={"credentials " + variant} aria-hidden="true">
      <span className="item"><span className="lang-en">Six Generations</span><span className="lang-zh">六代相傳</span></span>
      <span className="item"><span className="lang-en">No MSG</span><span className="lang-zh">無味精</span></span>
      <span className="item"><span className="lang-en">Small Batch</span><span className="lang-zh">小批量製作</span></span>
      <span className="item"><span className="lang-en">Hand-Hung</span><span className="lang-zh">人手懸掛</span></span>
      <span className="item"><span className="lang-en">SFHD Inspected</span><span className="lang-zh">衛生局批准</span></span>
    </div>
  );
}
