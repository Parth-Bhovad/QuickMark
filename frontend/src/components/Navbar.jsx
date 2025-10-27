import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";

function AppNavbar() {
  const navigate = useNavigate();
  const { currentUser, authChecked } = useAuthContext();

  const [expanded, setExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const navbarRef = useRef(null);

  const handleLoginRedirect = (role) => {
    navigate(`/${role}-login`);
    setShowLoginModal(false);
    setExpanded(false);
  };

  const handleSignupRedirect = (role) => {
    navigate(`/${role}-signup`);
    setShowSignupModal(false);
    setExpanded(false);
  };

  //Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (expanded && navbarRef.current && !navbarRef.current.contains(e.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expanded]);

  //Close on any link click
  const handleNavClick = () => setExpanded(false);

  return (
    <>
      <Navbar
        ref={navbarRef}
        expand="lg"
        bg="white"
        variant="light"
        fixed="top"
        className="shadow-sm border-bottom"
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
      >
        <Container fluid className="px-3">
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-5" onClick={handleNavClick}>
            QuickMark
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar" className="justify-content-end">
            <Nav className="align-items-lg-center gap-lg-3">
              <Nav.Link as={Link} to="/" className="fw-semibold" onClick={handleNavClick}>
                Home
              </Nav.Link>

              {!currentUser && (
                <>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="fw-semibold"
                    onClick={() => {
                      setShowLoginModal(true);
                      handleNavClick();
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="link"
                    className="fw-semibold text-decoration-none"
                    onClick={() => {
                      setShowSignupModal(true);
                      handleNavClick();
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {currentUser && authChecked && currentUser.role === "student" && (
                <>
                  <Nav.Link as={Link} to="/student/mark-attendance" className="fw-semibold" onClick={handleNavClick}>
                    Mark Attendance
                  </Nav.Link>
                  <Nav.Link as={Link} to="/student/profile" className="fw-semibold" onClick={handleNavClick}>
                    Profile
                  </Nav.Link>
                </>
              )}

              {currentUser && authChecked && currentUser.role === "teacher" && (
                <>
                  <Nav.Link as={Link} to="/teacher/attendance-session" className="fw-semibold" onClick={handleNavClick}>
                    Attendance Session
                  </Nav.Link>
                  <Nav.Link as={Link} to="/teacher/profile" className="fw-semibold" onClick={handleNavClick}>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/teacher/attendance-list" className="fw-semibold" onClick={handleNavClick}>
                    Attendance List
                  </Nav.Link>
                  <Nav.Link as={Link} to="/teacher/add-attendance" className="fw-semibold" onClick={handleNavClick}>
                    Add Attendance
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Login as</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-grid gap-3 mb-3">
            <Button variant="primary" className="fw-semibold" onClick={() => handleLoginRedirect("student")}>
              Student
            </Button>
            <Button variant="primary" className="fw-semibold" onClick={() => handleLoginRedirect("teacher")}>
              Teacher
            </Button>
          </div>
          <Button variant="outline-secondary" onClick={() => setShowLoginModal(false)} className="w-100">
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Sign up as</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-grid gap-3 mb-3">
            <Button variant="primary" className="fw-semibold" onClick={() => handleSignupRedirect("student")}>
              Student
            </Button>
            <Button variant="primary" className="fw-semibold" onClick={() => handleSignupRedirect("teacher")}>
              Teacher
            </Button>
          </div>
          <Button variant="outline-secondary" onClick={() => setShowSignupModal(false)} className="w-100">
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AppNavbar;
