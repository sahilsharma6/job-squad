import { useSelector } from 'react-redux';

export const useRoleAccess = () => {
  const user = useSelector((state) => state.auth.user);
  
  return {
    isAdmin: user?.role === 'admin',
    isInstructor: user?.role === 'instructor',
    isStudent: user?.role === 'student',
    role: user?.role,
  };
};