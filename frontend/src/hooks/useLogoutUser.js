import { useNavigate } from "react-router-dom";
//importing AuthContext
import { useAuthContext } from "../context/AuthContext";
//importing APIs
import { logoutUserAPI } from "../api/logoutUser.api.js";

function useLogoutUser() {
    const { setCurrentUser, setAuthChecked } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setCurrentUser(null);
        setAuthChecked(false);
        await logoutUserAPI();
        navigate("/");
    }
    return { handleLogout };
}

export default useLogoutUser;