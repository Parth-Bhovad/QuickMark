import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, authChecked } = useAuthContext();

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handleLoginRedirect = (role) => {
    navigate(`/${role}-login`);
    setShowLoginPopup(false);
  };

  const handleSignupRedirect = (role) => {
    navigate(`/${role}-signup`);
    setShowSignupPopup(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
        <div className="container-fluid px-3">
          {/* Brand */}
          <Link
            className="navbar-brand fw-bold text-primary"
            style={{ fontSize: "1.3rem" }}
            to="/"
          >
            QuickMark
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/">
                  Home
                </Link>
              </li>

              {!currentUser && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-semibold btn btn-outline-primary btn-sm"
                      onClick={() => setShowLoginPopup(true)}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link fw-semibold" onClick={() => setShowSignupPopup(true)}>
                      Sign Up
                    </button>
                  </li>
                </>
              )}

              {currentUser && authChecked && currentUser.role === "student" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/student/mark-attendance">
                      Mark Attendance
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/student/profile">
                      Profile
                    </Link>
                  </li>
                </>
              )}

              {currentUser && authChecked && currentUser.role === "teacher" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/teacher/attendance-session">
                      Attendance Session
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/teacher/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/attendance-list">
                      Attendance List
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Role Popup */}
      {showLoginPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3">
          <div className="bg-white rounded-4 shadow p-4 text-center" style={{ maxWidth: "400px", width: "90%" }}>
            <h4 className="fw-bold mb-4">Login as</h4>
            <div className="d-grid gap-3 mb-3">
              <button
                className="btn btn-primary fw-semibold"
                onClick={() => handleLoginRedirect("student")}
              >
                Student
              </button>
              <button
                className="btn btn-primary fw-semibold"
                onClick={() => handleLoginRedirect("teacher")}
              >
                Teacher
              </button>
            </div>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowLoginPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Signup Role Popup */}
      {showSignupPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3">
          <div className="bg-white rounded-4 shadow p-4 text-center" style={{ maxWidth: "400px", width: "90%" }}>
            <h4 className="fw-bold mb-4">Sign up as</h4>
            <div className="d-grid gap-3 mb-3">
              <button
                className="btn btn-primary fw-semibold"
                onClick={() => handleSignupRedirect("student")}
              >
                Student
              </button>
              <button
                className="btn btn-primary fw-semibold"
                onClick={() => handleSignupRedirect("teacher")}
              >
                Teacher
              </button>
            </div>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowSignupPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;