import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/authenticate/me", { withCredentials: true });
      if(res.status === 200) {
        setCurrentUser(res.data.user);
      }
      setAuthChecked(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, authChecked, setAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
};