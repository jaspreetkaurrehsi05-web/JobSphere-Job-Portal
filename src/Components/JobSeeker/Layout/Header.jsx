import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../../../Services/AuthService";
import { toast } from "react-toastify";

export default function Header() {
  const nav = useNavigate();
  const location = useLocation();
  const email = AuthService.getEmail();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
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

  function handleProtectedNavigation(path) {
    setIsMobileMenuOpen(false);
    if (!email) {
      toast.warning("Please login first to continue.");
      nav("/login", {
        state: { from: { pathname: path } },
      });
      return;
    }
    nav(path);
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
              <Link to="/">JobSphere</Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="site-navigation col d-none d-xl-flex justify-content-center text-center">
              <ul className="site-menu js-clone-nav mb-0 pl-0">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedNavigation("/categories");
                    }}
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedNavigation("/browsejobs");
                    }}
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li className="has-children">
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedNavigation("/myapplications");
                    }}
                  >
                    Applications
                  </Link>
                  <ul className="dropdown">
                    <li>
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleProtectedNavigation("/myapplications");
                        }}
                      >
                        My Applications
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="has-children">
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedNavigation("/myprofile");
                    }}
                  >
                    Profile
                  </Link>
                  <ul className="dropdown">
                    <li>
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleProtectedNavigation("/myprofile");
                        }}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleProtectedNavigation("/resumebuilder");
                        }}
                      >
                        Resume Builder
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedNavigation("/contact");
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right Desktop CTA + Mobile Hamburger Toggle */}
            <div className="right-cta-menu col-auto text-right d-flex align-items-center justify-content-end">
              <div className="d-none d-xl-flex align-items-center">
                {email ? (
                  <>
                    <Link
                      to="/saved-jobs"
                      className="btn btn-primary border-width-2 mr-2"
                    >
                      <span className="mr-2 icon-heart" />
                      Saved Jobs
                    </Link>

                    <button
                      onClick={logout}
                      className="btn btn-primary border-width-2 ml-2"
                    >
                      <span className="mr-2 icon-lock_outline" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-primary border-width-2 mr-2"
                    >
                      <span className="mr-2 icon-lock_outline" />
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-primary border-width-2 ml-2"
                    >
                      <span className="mr-2 icon-lock_outline" />
                      Log In
                    </Link>
                  </>
                )}
              </div>

              {/* Hamburger Button for Mobile / Tablet */}
              <button
                type="button"
                className="site-menu-toggle-btn d-inline-flex d-xl-none"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Toggle navigation menu"
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
        aria-label="Mobile Navigation"
      >
        <div className="app-mobile-nav-header">
          <Link
            to="/"
            className="app-mobile-nav-logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Job<span>Sphere</span>
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
                to="/"
                className="app-mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="app-mobile-nav-item">
              <Link
                to="/about"
                className="app-mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="app-mobile-nav-item">
              <a
                href="#"
                className="app-mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleProtectedNavigation("/categories");
                }}
              >
                Categories
              </a>
            </li>
            <li className="app-mobile-nav-item">
              <a
                href="#"
                className="app-mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleProtectedNavigation("/browsejobs");
                }}
              >
                Browse Jobs
              </a>
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
                    <a
                      href="#"
                      className="app-mobile-nav-submenu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProtectedNavigation("/myapplications");
                      }}
                    >
                      My Applications
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Profile Dropdown */}
            <li className="app-mobile-nav-item">
              <div
                className="app-mobile-nav-link has-submenu"
                onClick={() => toggleSubmenu("profile")}
              >
                <span>Profile</span>
                <span>{openSubmenu === "profile" ? "▲" : "▼"}</span>
              </div>
              {openSubmenu === "profile" && (
                <ul className="app-mobile-nav-submenu">
                  <li>
                    <a
                      href="#"
                      className="app-mobile-nav-submenu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProtectedNavigation("/myprofile");
                      }}
                    >
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="app-mobile-nav-submenu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProtectedNavigation("/resumebuilder");
                      }}
                    >
                      Resume Builder
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li className="app-mobile-nav-item">
              <a
                href="#"
                className="app-mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleProtectedNavigation("/contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Action Buttons in Drawer */}
        <div className="app-mobile-nav-footer">
          {email ? (
            <>
              <Link
                to="/saved-jobs"
                className="btn btn-outline-primary btn-block text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-2 icon-heart" />
                Saved Jobs
              </Link>
              <button
                onClick={logout}
                className="btn btn-danger btn-block text-left"
              >
                <span className="mr-2 icon-lock_outline" />
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="btn btn-outline-primary btn-block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-primary btn-block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
