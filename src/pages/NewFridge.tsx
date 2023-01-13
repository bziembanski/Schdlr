import React, { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

const auth = getAuth(firestoreApp);

export type FridgeType = {
  name: string;
  owner: string;
  sharedUsers: string[];
  description: string;
};

const NewFridge = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [users, setUsers] = useState<string[]>([]);

  const createFridge = async () => {
    setError(undefined);
    if (!name) {
      setError("Name is a required field");
      return;
    }
    const fridge: FridgeType = {
      name,
      description,
      sharedUsers: users,
      owner: user?.email ?? "",
    };
    const result = await addDoc(
      collection(getFirestore(firestoreApp), "boards"),
      fridge
    );
    navigate(`/board/${result.id}`);
    return;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full md:w-2/3 lg:w-1/3 h-auto p-10 bg-blue-dark rounded-3xl flex flex-col gap-2">
        <form
          id="create-form"
          onSubmit={(e) => {
            e.preventDefault();
            createFridge();
          }}
          className="w-full h-full flex justify-center flex-col gap-3 items-center"
        >
          <TextInput
            label="Fridge Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error}
          />
          <TextInput
            label="Fridge Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        <form
          className="w-full h-full flex flex-col gap-2 text-white"
          onSubmit={(e) => {
            e.preventDefault();
            setUsers((e) => [email, ...e]);
            setEmail("");
          }}
        >
          <div className="flex flex-nowrap overflow-hidden">
            <TextInput
              label="Add collaborator (email)"
              containerClassName="flex-grow flex-shrink flex-1 w-full"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            >
              <button className="material-icons self-end text-4xl relative bottom-2">
                add
              </button>
            </TextInput>
          </div>
          <div>Collaborators: </div>
          <div className="flex flex-col gap-2">
            {users.map((user) => (
              <div className="flex">
                <div>- {user}</div>
                <button
                  className="material-icons ml-auto"
                  onClick={() => {
                    setUsers((users) => users.filter((u) => u != user));
                  }}
                >
                  close
                </button>
              </div>
            ))}
          </div>
        </form>
        <div className="flex flex-col items-stretch gap-3 self-end mt-10">
          <Button
            className="min-w-full md:min-w-1/2"
            type="submit"
            form="create-form"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewFridge;
