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
    <div className="w-full h-full relative flex flex-col">
      <div className="w-full justify-end flex items-center gap-5">
        <span className="text-blue-dark font-bold text-3xl">
          {user.displayName ?? user.email}
        </span>
        <button className="h-[1em] text-lg" onClick={() => setIsOpen(true)}>
          <span className="material-icons text-blue-dark">arrow_back</span>
        </button>
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
