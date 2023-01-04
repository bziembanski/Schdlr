import { collection, doc, getFirestore, query } from "firebase/firestore";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import Card from "../components/Card";
import React from "react";
import collectionToData from "../utils/collectionToData";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";

const auth = getAuth(firestoreApp);

const Board: React.FC = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [cardsCol] = useCollection(
    query(collection(getFirestore(firestoreApp), `boards/${id}/cards`))
  );

  const [borad, loading, error] = useDocumentData();
  const cards = collectionToData(cardsCol);
  return (
    <div className="w-full h-full relative">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Board;
