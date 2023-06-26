import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <h4>Contact</h4>
        <ul>
          <li>
            <Link to="/kundeservice">Customer Support</Link>
          </li>
          <li>
            <Link to="/ledigestillinger">Open Jobs</Link>
          </li>
        </ul>
      </div>
      <div >
        <h4>Terms of service</h4>
        <ul>
          <li>
            <Link to="/brugervilkår">User Agreement</Link>
          </li>
          <li>
            <Link to="/regler">Guidelines</Link>
          </li>
        </ul>
      </div>
      <div>
        <h4>Other Links</h4>
        <ul>
          <li>
            <Link to="/privatliv">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/privatliv">About Us</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
