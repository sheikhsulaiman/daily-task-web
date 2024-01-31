import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Landing = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between p-2 bg-yellow-200">
        <h1>Daily Task</h1>
        <Link to={"/app"}>
          <Button type="button">Get Started</Button>
        </Link>
      </nav>
      <main></main>
    </>
  );
};

export default Landing;
