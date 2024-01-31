import { User } from "firebase/auth";
import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  user,
  redirectPath,
  children,
}: {
  user: User | null;
  redirectPath: string;
  children: ReactNode;
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
