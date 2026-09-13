import { createContext, useState, useContext, useEffect } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../axiosInstance/axios.js"

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const authQuery = useQuery(queryOptions({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await api.get("/authenticate/me", { withCredentials: true });
      return response.data.user;
    },
    retry: false,
    enabled: false
  }));

  useEffect(() => {
    if (authQuery.isSuccess) {
      setCurrentUser(authQuery.data);
      setAuthChecked(true);
    }

    if (authQuery.isError) {
      setCurrentUser(null);
      setAuthChecked(true);
    }
  }, [authQuery.data, authQuery.isError, authQuery.isSuccess]);

  const checkAuth = async () => {
    const result = await authQuery.refetch();
    if (result.isSuccess) {
      setCurrentUser(result.data);
    }
    setAuthChecked(true);
    return result;
  };


  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, authChecked, setAuthChecked, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};