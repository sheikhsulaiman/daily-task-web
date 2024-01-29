import AuthenticationPage from "./components/pages/AuthenticationPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <main className="container mx-auto flex flex-col justify-center min-h-screen">
        <AuthenticationPage />
      </main>
      <Toaster />
    </>
  );
}

export default App;
