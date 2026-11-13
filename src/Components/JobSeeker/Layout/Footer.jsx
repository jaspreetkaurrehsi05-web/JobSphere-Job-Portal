import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row mb-5">

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/browsejobs">Browse Jobs</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Job Seeker */}
          <div className="col-md-3 mb-4">
            <h3>Job Seeker</h3>
            <ul className="list-unstyled">
              <li><Link to="/myprofile">My Profile</Link></li>
              <li><Link to="/myapplications">My Applications</Link></li>
              <li><Link to="/resumebuilder">Resume Builder</Link></li>
              <li><Link to="/myapplications">Application Status</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3 mb-4">
            <h3>Support</h3>
            <ul className="list-unstyled">
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">FAQ</Link></li>
              <li><Link to="/contact">Privacy Policy</Link></li>
              <li><Link to="/contact">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h3>Contact Us</h3>

            <p className="mb-2">
              <i className="icon-envelope mr-2"></i>
              support@jobsphere.com
            </p>

            <p className="mb-3">
              <i className="icon-phone mr-2"></i>
              +91 98765 43210
            </p>

            <div className="footer-social">
              <a href="#"><span className="icon-facebook" /></a>
              <a href="#"><span className="icon-twitter" /></a>
              <a href="#"><span className="icon-instagram" /></a>
              <a href="#"><span className="icon-linkedin" /></a>
            </div>
          </div>

        </div>

        <hr style={{ borderColor: "#666" }} />

        <div className="row text-center">
          <div className="col-12">
            <p className="copyright mb-0">
              © 2026 <strong>JobSphere</strong>. All Rights Reserved.
              <br />
              Connecting Students & Recruiters.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}