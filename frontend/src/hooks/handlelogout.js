import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from "@/services/authApi";
import { logout } from "@/features/auth/authSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, you could add error handling or toast notification here
    }
  };

  return handleLogout;
};