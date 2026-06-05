import React from 'react';
import { HelpCircle, Gift, Briefcase, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Column */}
        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Flipkart Stories</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Corporate Information</a></li>
          </ul>
        </div>

        {/* Help Column */}
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Payments</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Cancellation & Returns</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Report Infringement</a></li>
          </ul>
        </div>

        {/* Policy Column */}
        <div className="footer-column">
          <h4>Consumer Policy</h4>
          <ul>
            <li><a href="#">Cancellation & Returns</a></li>
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Grievance Redressal</a></li>
            <li><a href="#">EPR Compliance</a></li>
          </ul>
        </div>

        {/* Social Column */}
        <div className="footer-column">
          <h4>Social</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>

        {/* Mail / Office Columns */}
        <div className="footer-column footer-column-special">
          <h4>Mail Us:</h4>
          <p style={{ color: '#aeaeae', marginBottom: '16px' }}>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
          <h4>Registered Office Address:</h4>
          <p style={{ color: '#aeaeae' }}>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: <a href="tel:044-45614700" style={{ color: 'var(--fk-blue)' }}>044-45614700</a>
          </p>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-badges">
          <a href="#" className="footer-badge-item">
            <Briefcase size={14} style={{ color: 'var(--fk-orange)' }} />
            <span>Become a Seller</span>
          </a>
          <a href="#" className="footer-badge-item">
            <Award size={14} style={{ color: 'var(--fk-orange)' }} />
            <span>Advertise</span>
          </a>
          <a href="#" className="footer-badge-item">
            <Gift size={14} style={{ color: 'var(--fk-orange)' }} />
            <span>Gift Cards</span>
          </a>
          <a href="#" className="footer-badge-item">
            <HelpCircle size={14} style={{ color: 'var(--fk-orange)' }} />
            <span>Help Center</span>
          </a>
        </div>
        
        <div>
          © 2007-2026 Flipkart.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
