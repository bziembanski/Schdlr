import React, { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import Button from "../components/Button";
import Drawer from "../components/Drawer";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";

const auth = getAuth(firestoreApp);

const RequireAuth: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return <div>Loading</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 right-0 flex justify-center items-center gap-5">
        <span className="text-blue-dark font-bold text-4xl">
          {user.displayName}
        </span>
        <button onClick={() => setIsOpen(true)}>{"<"}</button>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Button
          onClick={async () => {
            await signOut();
            setIsOpen(false);
          }}
        >
          Sign Out
        </Button>
      </Drawer>
      <Outlet />
    </div>
  );
};

export default RequireAuth;
