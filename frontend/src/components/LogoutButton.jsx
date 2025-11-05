import useLogoutUser from "../hooks/useLogoutUser";
import LoadingButton from "./LoadingButton";

function LogoutButton() {
    const { handleLogout, loggingOut } = useLogoutUser();
    return (
        <div className="mt-auto pb-4">
            <LoadingButton
                loading={loggingOut}
                variant="outline-danger"
                className="w-100"
                onClick={handleLogout}
                disabled={loggingOut}
            >
                <i className="bi bi-box-arrow-right"></i> Logout
            </LoadingButton>
        </div>
    );
}

export default LogoutButton;