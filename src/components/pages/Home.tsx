import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import TaskPage from "./TaskPage";

const Home = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between p-2 bg-primary">
        <h1 className="font-bold text-2xl text-yellow-800">Daily Task</h1>

        <Button
          type="button"
          variant={"destructive"}
          onClick={() => {
            signOut(auth);
          }}
        >
          Sign Out
        </Button>
      </nav>
      <main className="container mx-auto">
        <TaskPage />
      </main>
    </>
  );
};

export default Home;
