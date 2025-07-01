import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function TeacherAttendanceSession() {
  const socketRef = useRef(null);

  // useEffect(() => {
  //   console.log("TeacherAttendanceSession component mounted");

  //   // Connect to the socket server
  //   socketRef.current = io('http://localhost:3000');

  //   socketRef.current.emit("teacher", () => {
  //     console.log("req sended to server");
  //   });

  //   // Example event listener
  //   socketRef.current.on("teacher", (data) => {
  //     console.log("Received teacher event from server:", data);
  //   });

  //   // Clean up the connection when component unmounts
  //   return () => {
  //     socketRef.current.disconnect();
  //   };
  // }, []);

  return (
    <>
      <h1>Teacher Attendance Session</h1>
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
      >
        Get OTP
      </button>
    </>
  );
}

export default TeacherAttendanceSession;