import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-base-white">
      <header className="bg-gray-900 text-gray-300 py-12 px-6">
        header
        <Link to="/our/assets">
          <Button className="my-4 mx-4">Assets Page</Button>
        </Link>
      </header>

      <Outlet />
      <footer className="
       ">
        <Footer/>
      </footer>
    </div>
  );
};

export default App;
