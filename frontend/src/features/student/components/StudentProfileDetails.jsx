import { Card } from "react-bootstrap";

//custom hooks
import useStudentProfileDetails from "../hooks/useStudentProfileDetails";

function StudentProfileDetails() {
    const {
        studentName,
        rollNo,
        enrolledSubjects,
        isPending,
        error
    } = useStudentProfileDetails();

    if(isPending){
        return <div>loading</div>
    }
    if(error){
        return <div>Failed to fetch student profile</div>
    }
    
    return (
        <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Body className="text-center">
                {/* Avatar */}
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#e9f2ff",
                        borderRadius: "50%",
                        margin: "0 auto 15px auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#007bff",
                    }}
                >
                    {studentName ? studentName.charAt(0).toUpperCase() : "S"}
                </div>

                <h5 className="fw-bold">{studentName}</h5>
                <p className="text-muted mb-1">Roll No: {rollNo}</p>
                <p className="text-muted">
                    Subjects:{" "}
                    {enrolledSubjects?.length ? enrolledSubjects.join(", ") : "No subjects yet"}
                </p>
            </Card.Body>
        </Card>
    );
}

export default StudentProfileDetails;