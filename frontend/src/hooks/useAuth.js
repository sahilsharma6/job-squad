import { useSelector } from 'react-redux';

export const useAuth = () => {
  // const user = useSelector((state) => state.auth.user);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const loading = useSelector((state) => state.auth.loading);
  // const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  //dummy
  // const user = {
  //   _id: "123456789",
  //   companyName: "Tech Solutions Ltd.",
  //   companyDescription: "A leading provider of innovative tech solutions for businesses.",
  //   companyLogo: "https://example.com/logo.png",
  //   companyWebsite: "https://www.techsolutions.com",
  //   contactPersonName: "John Doe",
  //   contactPersonEmail: "john.doe@techsolutions.com",
  //   password: "hashedpassword123",
  //   contactPersonPhone: "+1-234-567-890",
  //   contactPersonProfile: "https://example.com/john-doe-profile.png",
  //   isValide: true,
  //   role: "company"
  // };;
  // const isAuthenticated = true;
  // const loading = false;
  // const error = null;

  return {
    // user,
    user,
    role: user?.role || null,
    isAuthenticated,
    // loading,
    // error
  };
};