import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-base-white">
      <header>
        <Navbar />
      </header>

      <Outlet />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
