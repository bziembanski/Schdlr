import { DocumentData, useAuthState } from "react-firebase-hooks/auth";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

import { NavLink } from "react-router-dom";
import React from "react";
import collectionToData from "../utils/collectionToData";
import firestoreApp from "../firestoreApp";
import { getAuth } from "@firebase/auth";

const auth = getAuth(firestoreApp);

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [myBoardsCol, loading, error] = useCollection(
    query(
      collection(getFirestore(firestoreApp), "boards"),
      where("owner", "==", user?.email)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [shardBoardCol] = useCollection(
    query(
      collection(getFirestore(firestoreApp), "boards"),
      where("sharedUsers", "array-contains", user?.email)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const data = [
    ...collectionToData(myBoardsCol),
    ...collectionToData(shardBoardCol),
  ];

  return (
    <div className="flex h-full w-full items-center px-4 md:px-20 overflow-auto pt-20">
      <div className="flex gap-10 h-full overflow-y-auto overflow-x-hidden flex-col w-full md:w-auto md:flex-row md:flex-wrap items-center content-center">
        <div className="h-96 bg-blue-dark w-full md:w-64 rounded-3xl shadow-xl flex flex-col shrink-0">
          <div className="bg-white h-1/3 rounded-3xl flex items-center justify-center text-blue-dark font-bold">
            <span className="material-icons text-5xl">add</span>
          </div>
          <div className="text-white font-bold flex flex-grow flex-col justify-center items-center text-center">
            Dodaj nową lodówkę
          </div>
        </div>
        {data.map((board) => (
          <div
            className="h-96  bg-blue-dark w-full md:w-64 rounded-3xl shadow-xl flex flex-col shrink-0 mb-5 md:mb-0"
            key={board.id}
          >
            <div className="bg-white h-1/3 rounded-3xl flex items-center justify-center text-blue-dark font-bold">
              <NavLink to={`board/${board.id}`}>{board.name}</NavLink>
            </div>
            <div className="text-white font-bold flex flex-grow flex-col justify-center items-center text-center">
              {board.owner === user?.email ? (
                <>
                  <span>Moja lodówka dzielona z: </span>
                  {board.sharedUsers.map((user) => (
                    <span>{user}</span>
                  ))}
                </>
              ) : (
                <>
                  <span>Lodówka dzielona przez: </span>
                  <span>{board.owner}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
