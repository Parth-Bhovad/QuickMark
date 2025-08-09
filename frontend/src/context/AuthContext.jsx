import { createContext, useState, useContext, useEffect } from "react";
import api from "../axiosInstance/axios.js"

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await api.get("/authenticate/me", { withCredentials: true });
      if (res.status === 200) {
        setCurrentUser(res.data.user);
      }
      setAuthChecked(true);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, authChecked, setAuthChecked, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};