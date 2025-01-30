import { useSelector } from 'react-redux';

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  return {
    user,
    isAuthenticated,
    loading,
    error
  };
};