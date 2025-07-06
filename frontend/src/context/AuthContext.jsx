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
      console.log("Checking authentication status...");

      const res = await axios.get("http://localhost:3000/api/v1/authenticate/me", { withCredentials: true });
      console.log("Checking authentication status...2");
      console.log(res.data.user);
      setCurrentUser(res.data.user);
      setAuthChecked(true);
    };
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};