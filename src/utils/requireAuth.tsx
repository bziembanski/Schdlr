import { Navigate } from "react-router-dom";
import React from "react";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(firestoreApp);

const RequireAuth: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default RequireAuth;
