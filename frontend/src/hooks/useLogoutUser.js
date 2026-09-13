import { useNavigate } from "react-router-dom";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
//importing AuthContext
import { useAuthContext } from "../context/AuthContext";
//importing APIs
import { logoutUserAPI } from "../api/logoutUser.api.js";

function useLogoutUser() {
  const { setCurrentUser, setAuthChecked } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authQuery = queryOptions({ queryKey: ["auth", "me"] });

  const logoutMutation = useMutation({
    mutationFn: logoutUserAPI,
    onMutate: () => {
      queryClient.removeQueries({ queryKey: authQuery.queryKey });
      setCurrentUser(null);
      setAuthChecked(false);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      setAuthChecked(true);
    },
  });

  return {
    handleLogout: logoutMutation.mutate,
    loggingOut: logoutMutation.isPending,
  };
}

export default useLogoutUser;