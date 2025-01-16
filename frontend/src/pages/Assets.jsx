import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const AssetsForDesign = () => {
  return (
    <div className="bg-base-white">
      <Link to="/">
        <Button className="my-4 mx-4">Back to Home page</Button>
      </Link>

      <h1 className="bg-blue-ultra">Blue</h1>
      <h1 className="bg-blue-light">Blue</h1>
      <h1 className="bg-blue-dark">Blue</h1>
      <h1 className="bg-blue-black text-white">Blue</h1>

      <h1 className="bg-green-ultra">Green</h1>
      <h1 className="bg-green-light">Green</h1>
      <h1 className="bg-green-dark">Green</h1>
      <h1 className="bg-green-black text-white">Green</h1>

      <h1 className="bg-grey-muted ">grey</h1>

      <h1>noramal text</h1>

      <h1 className="text-8xl">Large Text</h1>
      <h1 className="text-9xl">Larger Text</h1>
      <h1 className="text-10xl">Largest Text</h1>

      <p className="font-super-thin">50 weight</p>
      <p className="font-ultra-light">150 weight</p>
      <p className="font-book">350 weight</p>
      <p className="font-semi-medium">450 weight</p>
      <p className="font-demi-bold">550 weight</p>
      <p className="font-heavy">850 weight</p>
      <p className="font-extra-black">950 weight</p>
    </div>
  );
};

export default AssetsForDesign;
