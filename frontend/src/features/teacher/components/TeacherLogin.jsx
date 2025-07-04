import InputField from "../../../components/InputField";
//importing custom hooks
import useAuth from "../hooks/useAuth";

function TeacherLogin() {
    const {
        teacherEmail,
        setTeacherEmail,
        teacherPassword,
        setTeacherPassword,
        handleLoginTeacher
    } = useAuth();

    return (
        <>
            <h1>Teacher Login Page</h1>
            <form>
                <InputField
                    label={"Teacher Email:"}
                    id={"email"}
                    name={"teacherEmail"}
                    required={true}
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)} />
                    
                <InputField
                    label={"Teacher Password:"}
                    id={"password"}
                    name={"teacherPassword"}
                    required={true}
                    type={"password"}
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)} />
                <button type="submit" onClick={handleLoginTeacher}>Login</button>
            </form>
        </>
    );
}

export default TeacherLogin;