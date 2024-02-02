import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowUpRightFromSquareIcon } from "lucide-react";

const Landing = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between p-2 bg-yellow-200">
        <h1 className="font-bold text-2xl text-yellow-800">Daily Task</h1>
        <Link to={"/app"}>
          <Button type="button">
            Get Started <ArrowUpRightFromSquareIcon className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </nav>
      <main></main>
    </>
  );
};

export default Landing;
