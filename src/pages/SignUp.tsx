import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import Button from "../components/Button";
import Google from "../assets/google.png";
import TextInput from "../components/TextInput";
import firestoreApp from "../firestoreApp";
import { getAuth } from "@firebase/auth";

const auth = getAuth(firestoreApp);

const SignUp = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, _user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full md:w-1/3 h-auto p-10 bg-blue-dark rounded-3xl flex justify-center flex-col gap-3 items-center">
        <form
          className="w-full h-full"
          onSubmit={() => createUser(email, password)}
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
            error={error?.message}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col items-stretch gap-3">
            <Button className="w-full md:w-1/2 " type="submit">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
