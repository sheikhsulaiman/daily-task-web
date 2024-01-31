import AuthenticationPage from "@/components/pages/AuthenticationPage";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import Home from "@/components/pages/Home";
import Landing from "@/components/pages/Landing";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setUser(user);
      }
    });
  }, [auth, user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute user={user} redirectPath="/auth">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            user ? (
              <Navigate to={"/app"} />
            ) : (
              <main className="mx-auto container flex flex-col items-center justify-center min-h-screen">
                <AuthenticationPage />
              </main>
            )
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
