import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const Home = () => {
  const userName = auth.name;
  return (
    <>
      <nav className="w-full flex items-center justify-between p-2 bg-yellow-200">
        <h1 className="font-bold text-2xl text-yellow-800">Daily Task</h1>

        <Button
          type="button"
          onClick={() => {
            signOut(auth);
          }}
        >
          Sign Out
        </Button>
      </nav>
      <main>
        Home
        {userName}
      </main>
    </>
  );
};

export default Home;
