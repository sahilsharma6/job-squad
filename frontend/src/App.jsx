import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

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
      <footer className="bg-gray-900 text-gray-300 py-12 mt-2 px-6 ">
        footer
      </footer>
    </div>
  );
};

export default App;
