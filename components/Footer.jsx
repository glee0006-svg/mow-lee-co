import { I18N } from "@/lib/i18n";
import Credentials from "./Credentials";

export default function Footer() {
  return (
    <footer className="footer" data-screen-label="06 Footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand-zh">茂利號腊味</div>
            <div className="brand-en">Mow Lee &amp; Co.</div>
            <div className="tag">
              <span className="lang-en">{I18N.footer.tagline.en}</span>
              <span className="lang-zh">{I18N.footer.tagline.zh}</span>
            </div>
          </div>
          <div>
            <h4><span className="lang-en">Visit</span><span className="lang-zh">門市</span></h4>
            <ul>
              <li>774 Commercial St</li>
              <li>San Francisco, CA 94108</li>
              <li><a href="tel:+14159825767" style={{ color: "inherit", textDecoration: "none" }}>(415) 982-5767</a></li>
              <li>10:00 AM – 6:00 PM</li>
            </ul>
          </div>
          <div>
            <h4><span className="lang-en">Shop</span><span className="lang-zh">選購</span></h4>
            <ul>
              <li><span className="lang-en">Sausages</span><span className="lang-zh">腸類</span></li>
              <li><span className="lang-en">Pork</span><span className="lang-zh">豬肉</span></li>
              <li><span className="lang-en">Duck</span><span className="lang-zh">鴨類</span></li>
              <li><span className="lang-en">Dried Goods</span><span className="lang-zh">乾貨</span></li>
            </ul>
          </div>
          <div>
            <h4><span className="lang-en">Connect</span><span className="lang-zh">聯絡</span></h4>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li><span className="lang-en">WeChat (QR)</span><span className="lang-zh">微信 (掃碼)</span></li>
              <li><span className="lang-en">Newsletter</span><span className="lang-zh">電郵通訊</span></li>
            </ul>
          </div>
        </div>
        <div className="heritage-line">
          <span className="dash" />
          <span className="ornament" />
          <span>
            <span className="lang-en">Hand-hung and cured in San Francisco Chinatown.</span>
            <span className="lang-zh">人手懸掛、慢火烘焙於三藩市唐人街。</span>
          </span>
          <span className="ornament" />
          <span className="dash" />
        </div>
        <div style={{ marginTop: 22 }}><Credentials variant="light" /></div>
        <div className="seal">
          <span>
            <span className="lang-en">{I18N.footer.seal.en}</span>
            <span className="lang-zh">{I18N.footer.seal.zh}</span>
          </span>
          <span>© {new Date().getFullYear()} Mow Lee Shing Kee &amp; Co. · 茂利號 · Six Generations.</span>
        </div>
      </div>
    </footer>
  );
}
