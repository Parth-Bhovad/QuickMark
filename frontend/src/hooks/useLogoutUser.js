import { useNavigate } from "react-router-dom";
import { useState } from "react";
//importing AuthContext
import { useAuthContext } from "../context/AuthContext";
//importing APIs
import { logoutUserAPI } from "../api/logoutUser.api.js";

function useLogoutUser() {
  const { setCurrentUser, setAuthChecked } = useAuthContext();
  //Adding loading state
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setCurrentUser(null);
      setAuthChecked(false);
      await logoutUserAPI();
      setLoggingOut(false);
      navigate("/");
    } catch (error) {
      setLoggingOut(false);
    }
  };
  return { handleLogout, loggingOut };
}

export default useLogoutUser;