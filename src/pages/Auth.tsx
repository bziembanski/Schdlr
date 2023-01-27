import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

import Button from "../components/Button";
import Google from "../assets/google.png";
import TextInput from "../components/TextInput";
import firestoreApp from "../firestoreApp";
import { getAuth } from "@firebase/auth";

const auth = getAuth(firestoreApp);

const Auth = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, _user, _loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const [signInWithGoogle] = useSignInWithGoogle(auth);

  if (user) return <Navigate to="/" />;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full md:w-1/3 h-auto p-10 bg-blue-dark rounded-3xl flex justify-center flex-col gap-3 items-center shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signInWithEmailAndPassword(email, password);
          }}
        >
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            error={error?.message}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col items-stretch gap-3 mt-3">
            <Button className="mw-full md:mw-1/2 " type="submit">
              Sign In
            </Button>
            <Button
              className="mw-full md:mw-1/2 whitespace-nowrap inline-flex justify-center items-center gap-2"
              type="button"
              onClick={() => signInWithGoogle([""])}
            >
              <img className="h-[2em] w-auto" src={Google} />
              Sign In with Google
            </Button>
            <Button
              type="button"
              className="mw-full md:mw-1/2 "
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
