import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import Button from "../components/Button";
import Drawer from "../components/Drawer";
import { Outlet } from "react-router-dom";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useTitleContext } from "../contexts/titleContext";

const auth = getAuth(firestoreApp);

const RequireAuth: React.FC = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [title] = useTitleContext();

  if (loading) {
    return <div>Loading</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log(title);
  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="w-full justify-end flex items-center gap-5">
        <button
          className="material-icons text-3xl md:text-4xl mr-auto text-blue-dark"
          onClick={() => navigate("/")}
        >
          arrow_back
        </button>
        <span className="text-blue-dark font-bold text-xl md:text-3xl">
          {title ?? user.displayName ?? user.email}
        </span>
        <button
          className="h-[1em] text-md md:text-lg"
          onClick={() => setIsOpen(true)}
        >
          <span className="material-icons text-blue-dark">menu</span>
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
