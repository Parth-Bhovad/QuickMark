import StudentProfile from "../components/StudentProfile";
import StudentProvider from "../context/StudentProvider";

function StudentProfilePage() {
    return (
        <main>
            <StudentProvider>
                <StudentProfile />
            </StudentProvider>
        </main>
    );
}

export default StudentProfilePage;