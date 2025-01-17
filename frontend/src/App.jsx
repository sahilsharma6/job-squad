import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div className="bg-base-white">
      <header >
        <Navbar />
      </header>

      <Outlet />
      <footer className="bg-gray-900 text-gray-300 py-12 mt-2 px-6 ">
        footer
      </footer>
    </div>
  );
};

export default App;
