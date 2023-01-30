import React, { useEffect, useState } from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Textarea from "../components/Textarea";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

const auth = getAuth(firestoreApp);

export type FridgeType = {
  name: string;
  owner: string;
  sharedUsers: string[];
  description: string;
};

const EditFridge = () => {
  const [user] = useAuthState(auth);
  const { id = "" } = useParams();
  const [board] = useDocumentData(
    doc(getFirestore(firestoreApp), "boards", id)
  );
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (board) setUsers(board.sharedUsers);
  }, [board?.sharedUsers]);

  const editFridge = async () => {
    const fridge = {
      sharedUsers: users,
    };
    await updateDoc(doc(getFirestore(firestoreApp), "boards", id), fridge);
    navigate(`/`);
    return;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full md:w-2/3 lg:w-1/3 h-auto p-10 bg-blue-dark rounded-3xl flex flex-col gap-2">
        <form
          id="create-form"
          onSubmit={(e) => {
            e.preventDefault();
            editFridge();
          }}
          className="w-full h-full flex justify-center flex-col gap-3 items-center"
        >
          <TextInput
            label="Fridge Name"
            type="text"
            value={board?.name}
            disabled
          />
          <Textarea
            label="Fridge Description"
            value={board?.description}
            disabled
            rows={5}
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
              <div className="flex" key={user}>
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
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditFridge;
