import { useEffect } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function TeacherAttendanceSession() {

  const { currentUser, authChecked } = useAuthContext();

  const [showPopup, setShowPopup] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isHavingSubjects, setIsHavingSubjects] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState([]);


  const getTeacherSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/teachers/${currentUser.id}/subjects`);
      console.log(response);
      if (response.data.subjects.length === 0) {
        setIsHavingSubjects(false);
      } else {
        setIsHavingSubjects(true);
        setAvailableSubjects(response.data.subjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authChecked) {
      return
    }
    getTeacherSubjects();
  }, [authChecked, currentUser]);
  return (
    <>
      <h1>Teacher Attendance Session</h1>

      {showPopup && (
        <div
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
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <h2>Select Subject</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {!isHavingSubjects && (
                <div style={{ color: "red" }}>
                  No subjects available
                  <button onClick={() => {
                    setShowPopup(false);
                  }}>Close</button>
                </div>
              )}
              {isHavingSubjects && availableSubjects.map((subject) => (
                <div
                  key={subject}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setShowPopup(false);
                  }}
                  style={{
                    padding: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "#f5f5f5",
                    transition: "background 0.2s",
                  }}
                >
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={async () => {
          try {
            const axios = (await import("axios")).default;
            const response = await axios.get("http://localhost:3000/api/v1/attendance/otp", {
              params: { subjectName: "WEB" }
            });
            console.log(response);

            // alert(`OTP: ${response.data.otp}`);
          } catch (error) {
            console.log(error);

            // alert("Failed to fetch OTP");
          }
        }}
        disabled={!selectedSubject}
      >
        Get OTP
      </button>
    </>
  );
}

export default TeacherAttendanceSession;