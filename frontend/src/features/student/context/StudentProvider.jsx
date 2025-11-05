import { StudentContext } from "./StudentContext";
import { useState } from "react";

function StudentProvider({ children }) {
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);

    return (
        <StudentContext value={{ enrolledSubjects, setEnrolledSubjects }}>
            {children}
        </StudentContext>
    );
}

export default StudentProvider;
