import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowUpRightFromSquareIcon, ArrowUpRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Landing = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between p-2 bg-primary">
        <h1 className="font-bold text-2xl text-primary-foreground">
          Daily Task
        </h1>
        <Link to={"/app"}>
          <Button type="button" variant={"outline"}>
            Get Started <ArrowUpRightFromSquareIcon className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </nav>
      <main>
        <section className="container mx-auto flex flex-col items-center justify-center min-h-[40vh]">
          <h1 className="text-4xl text-center font-space-grotesk  dark:text-white text-primary-foreground">
            The task-manager <br />
            <span className="bg-yellow-200 text-primary-foreground">
              you've
            </span>{" "}
            always wanted
          </h1>
          <p className=" mt-3 text-lg text-center font-shantell-sans text-wrap dark:text-slate-300 text-primary-foreground">
            Streamline Your Workflow, Boost Productivity, and Stay Organized
            with Our Intuitive Task Management App
          </p>
        </section>
        <section className="container mx-auto flex flex-col items-center justify-center">
          <Link to={"/app"}>
            <Button
              type="button"
              className="rounded-full text-primary shadow-md"
              variant={"outline"}
            >
              Try it now <ArrowUpRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <motion.p
            initial={{ scale: 0.7 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            whileInView={{ scale: 1 }}
            className=" mt-3 text-lg text-center font-space-grotesk text-wrap dark:text-slate-300 text-primary-foreground"
          >
            Join Thousands of Users Who Have Simplified Their Workflows with{" "}
            <span className="bg-yellow-200 text-xl text-primary-foreground">
              daily task.
            </span>
            <br />
            Sign Up Today and Experience the Difference!
          </motion.p>
        </section>

        <section className="container mt-4 mx-auto flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.7 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            whileInView={{ scale: 1 }}
          >
            <img
              className="border rounded-md"
              src="/task_cover_pic.png"
              alt="task-image"
            />
          </motion.div>
        </section>
        <section className="container mx-auto flex items-center justify-center mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Intuitive Task Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily create, prioritize, and manage tasks with our intuitive
                drag-and-drop interface
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Collaborative Workspaces</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Collaborate seamlessly with your team by sharing tasks,
                assigning deadlines, and tracking progress in real-time
              </CardDescription>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Landing;
