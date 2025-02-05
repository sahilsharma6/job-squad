import { Outlet, useNavigationType } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

const App = () => {

  const [loading, setLoading] = useState(false);
  const navigationType = useNavigationType();

  useEffect(() => {
    // Show the loader during route changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
    return () => clearTimeout(timer); // Clean up timer
  }, [navigationType]);

  return (
    <>
      {loading && <Loading />}
      <div className="bg-base-white">
        <header>
          <Navbar />
        </header>
        <Outlet />
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default App;
