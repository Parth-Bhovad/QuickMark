import StudentProfileDetails from "./StudentProfileDetails"
import StudentSubjectEditCard from "./StudentSubjectEditCard";
import LogoutButton from "../../../components/LogoutButton";

function StudentProfile() {
  return (
    <main
      className="container mt-4 d-flex flex-column mt-5 pt-5"
      style={{ maxWidth: "500px", minHeight: "100vh" }}
    >
      {/* Profile Card */}
      <StudentProfileDetails />

      {/* Add Subject */}
      <StudentSubjectEditCard />

      {/* logout button */}
      <LogoutButton />
    </main>
  );
}

export default StudentProfile;
