import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../../Services/AuthService";

export default function AdminHeader() {
  const nav = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function logout(e) {
    if (e) e.preventDefault();
    AuthService.logout();
    toast.success("Logout Successful");
    setIsMobileMenuOpen(false);
    nav("/login");
  }

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <>
      <header className="site-navbar">
        <div className="container-fluid px-3 px-md-4">
          <div className="row align-items-center justify-content-between flex-nowrap">
            {/* Logo */}
            <div className="site-logo col-auto">
              <Link to="/admin">
                Job<span>Sphere</span> <small style={{ fontSize: "12px", color: "#8bc400" }}>Admin</small>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="site-navigation col d-none d-xl-flex justify-content-center text-center">
              <ul className="site-menu js-clone-nav mb-0 pl-0">
                <li>
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li className="has-children">
                  <Link to="/admin/managejobseeker">Job Seekers</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="/admin/managejobseeker">Manage Job Seekers</Link>
                    </li>
                  </ul>
                </li>
                <li className="has-children">
                  <Link to="/admin/managecategories">Categories</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="/admin/managecategories">Manage Categories</Link>
                    </li>
                  </ul>
                </li>
                <li className="has-children">
                  <Link to="/admin/managejobs">Jobs</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="/admin/managejobs">Manage Jobs</Link>
                    </li>
                  </ul>
                </li>
                <li className="has-children">
                  <Link to="/admin/viewapplications">Applications</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="/admin/viewapplications">View Applications</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/admin/contactmessages">Contact Messages</Link>
                </li>
              </ul>
            </nav>

            {/* Right Desktop CTA + Mobile Hamburger Toggle */}
            <div className="right-cta-menu col-auto text-right d-flex align-items-center justify-content-end">
              <div className="d-none d-xl-flex align-items-center">
                <button
                  onClick={logout}
                  className="btn btn-outline-white border-width-2 text-white"
                >
                  Logout
                </button>
              </div>

              {/* Hamburger Button for Mobile / Tablet */}
              <button
                type="button"
                className="site-menu-toggle-btn d-inline-flex d-xl-none"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Toggle admin navigation menu"
              >
                <span className="icon-menu" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`app-mobile-nav-backdrop ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-out Mobile Navigation Drawer */}
      <aside
        className={`app-mobile-nav-drawer ${isMobileMenuOpen ? "active" : ""}`}
        aria-label="Admin Mobile Navigation"
      >
        <div className="app-mobile-nav-header">
          <Link
            to="/admin"
            className="app-mobile-nav-logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Job<span>Sphere</span> Admin
          </Link>
          <button
            type="button"
            className="app-mobile-nav-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <div className="app-mobile-nav-body">
          <ul className="app-mobile-nav-list">
            <li className="app-mobile-nav-item">
              <Link
                to="/admin"
                className="app-mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>

            {/* Job Seekers Dropdown */}
            <li className="app-mobile-nav-item">
              <div
                className="app-mobile-nav-link has-submenu"
                onClick={() => toggleSubmenu("jobseekers")}
              >
                <span>Job Seekers</span>
                <span>{openSubmenu === "jobseekers" ? "▲" : "▼"}</span>
              </div>
              {openSubmenu === "jobseekers" && (
                <ul className="app-mobile-nav-submenu">
                  <li>
                    <Link
                      to="/admin/managejobseeker"
                      className="app-mobile-nav-submenu-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Manage Job Seekers
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Categories Dropdown */}
            <li className="app-mobile-nav-item">
              <div
                className="app-mobile-nav-link has-submenu"
                onClick={() => toggleSubmenu("categories")}
              >
                <span>Categories</span>
                <span>{openSubmenu === "categories" ? "▲" : "▼"}</span>
              </div>
              {openSubmenu === "categories" && (
                <ul className="app-mobile-nav-submenu">
                  <li>
                    <Link
                      to="/admin/managecategories"
                      className="app-mobile-nav-submenu-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Manage Categories
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Jobs Dropdown */}
            <li className="app-mobile-nav-item">
              <div
                className="app-mobile-nav-link has-submenu"
                onClick={() => toggleSubmenu("jobs")}
              >
                <span>Jobs</span>
                <span>{openSubmenu === "jobs" ? "▲" : "▼"}</span>
              </div>
              {openSubmenu === "jobs" && (
                <ul className="app-mobile-nav-submenu">
                  <li>
                    <Link
                      to="/admin/managejobs"
                      className="app-mobile-nav-submenu-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Manage Jobs
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Applications Dropdown */}
            <li className="app-mobile-nav-item">
              <div
                className="app-mobile-nav-link has-submenu"
                onClick={() => toggleSubmenu("applications")}
              >
                <span>Applications</span>
                <span>{openSubmenu === "applications" ? "▲" : "▼"}</span>
              </div>
              {openSubmenu === "applications" && (
                <ul className="app-mobile-nav-submenu">
                  <li>
                    <Link
                      to="/admin/viewapplications"
                      className="app-mobile-nav-submenu-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View Applications
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="app-mobile-nav-item">
              <Link
                to="/admin/contactmessages"
                className="app-mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Messages
              </Link>
            </li>
          </ul>
        </div>

        <div className="app-mobile-nav-footer">
          <button
            onClick={logout}
            className="btn btn-danger btn-block text-center"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
