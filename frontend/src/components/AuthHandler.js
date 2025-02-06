import { setCredentials } from "@/features/auth/authSlice";
import { useFetchUserQuery } from "@/services/authApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const { data: user, error } = useFetchUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(setCredentials(user));
      navigate("/dashboard");
    }
    if (error) {
      console.error("Authentication failed:", error);
    }
  }, [user, error, dispatch, navigate]);

  return null; // No UI needed
};

export default AuthHandler;
