import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//importing auth context
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { currentUser, authChecked } = useAuthContext();

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);

    const handleLoginRedirect = (role) => {
        if (role === 'student') {
            navigate('/student-login');
        } else if (role === 'teacher') {
            navigate('/teacher-login');
        }
    }

    const handleSignupRedirect = (role) => {
        if (role === 'student') {
            navigate('/student-signup');
        } else if (role === 'teacher') {
            navigate('/teacher-signup');
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">QuickMark</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {!currentUser &&
                            <>
                                <li className="nav-item">
                                    <div onClick={() => setShowLoginPopup(true)}>Login</div>
                                </li>
                                <li className="nav-item">
                                    <div onClick={() => setShowSignupPopup(true)}>SignUp</div>
                                </li>
                            </>}

                        {currentUser && authChecked && currentUser.role === 'student' &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/student/mark-attendance">Mark Attendance</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/student/profile">Profile</Link>
                                </li>
                            </>}

                        {currentUser && authChecked && currentUser.role === 'teacher' &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/teacher/attendance-session">Attendance Session</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/teacher/profile">Profile</Link>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>

            {showLoginPopup && <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    className="bg-white rounded shadow p-4 text-center"
                    style={{ width: "90%", maxWidth: "400px" }}
                >
                    <h4 className="mb-4">Select Your Role</h4>
                    <div className="d-grid gap-2 mb-3">
                        <button className="btn btn-primary" onClick={() => handleLoginRedirect('student')}>
                            Student
                        </button>
                        <button className="btn btn-primary" onClick={() => handleLoginRedirect('teacher')}>
                            Teacher
                        </button>
                    </div>
                    <button className="btn btn-secondary w-100" onClick={() => setShowLoginPopup(false)}>
                        Close
                    </button>
                </div>
            </div>
            }
            {showSignupPopup && <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    className="bg-white rounded shadow p-4 text-center"
                    style={{ width: "90%", maxWidth: "400px" }}
                >
                    <h4 className="mb-4">Select Your Role</h4>
                    <div className="d-grid gap-2 mb-3">
                        <button className="btn btn-primary" onClick={() => handleSignupRedirect('student')}>
                            Student
                        </button>
                        <button className="btn btn-primary" onClick={() => handleSignupRedirect('teacher')}>
                            Teacher
                        </button>
                    </div>
                    <button className="btn btn-secondary w-100" onClick={() => setShowSignupPopup(false)}>
                        Close
                    </button>
                </div>
            </div>
            }
        </nav>
    );
}

export default Navbar;