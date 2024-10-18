import { useAppDispatch } from "@/app/hooks";
import { logout as logoutAction } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/services/authService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="h-[80vh] flex items-center justify-center text-center">
      <h1>Logout Successful will be redirect back in 3s</h1>
    </div>
  );
};

export default Logout;
