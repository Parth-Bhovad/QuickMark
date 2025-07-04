import InputField from "../../../components/InputField";

//importing custom hook
import useAuth from "../hooks/useAuth";

function StudentLogin() {
    //using custom hook
    const { studentEmail, setStudentEmail, studentPassword, setStudentPassword, handleLoginStudent } = useAuth();
    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleLoginStudent}>
                <InputField
                    label={"Student Email:"}
                    id={"email"}
                    name={"studentEmail"}
                    required={true}
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)} />
                <InputField
                    label={"Student Password:"}
                    id={"password"}
                    name={"studentPassword"}
                    required={true}
                    type={"password"}
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default StudentLogin;