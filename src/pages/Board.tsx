import Card, {
  CardProps,
  CardType,
  Cords,
  EventParams,
  MovementMode,
} from "../components/Card";
import React, { useEffect, useState } from "react";
import { collection, doc, getFirestore, query } from "firebase/firestore";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import collectionToData from "../utils/collectionToData";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";

const auth = getAuth(firestoreApp);

type MovementDetails = {
  id: string;
  offset: Cords;
  mode: MovementMode;
};

const Board: React.FC = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [cardsCol] = useCollection(
    query(collection(getFirestore(firestoreApp), `boards/${id}/cards`))
  );
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    setCards(collectionToData(cardsCol));
  }, [cardsCol]);

  const [movementDetails, setMovementDetails] = useState<MovementDetails>();

  const onMouseMove = (e: EventParams) => {
    if (!movementDetails) return;
    const { offset, id, mode } = movementDetails;
    const currentCard = cards.find((card) => card.id === id);
    if (!currentCard) return;
    const cardChange: Partial<CardType> = {};

    if (mode === MovementMode.Moving) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      cardChange.position = { x, y };
    } else {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      cardChange.size = { x, y };
    }

    setCards((cards) =>
      cards.map((card) => {
        if (card.id === id) {
          return { ...card, ...cardChange };
        }
        return card;
      })
    );
  };

  const onCardSelect = (id: string, offset: Cords, mode: MovementMode) => {
    setMovementDetails({ id, offset, mode });
  };

  return (
    <div
      className="w-full h-full relative"
      onMouseMove={onMouseMove}
      onTouchMove={(e) => {
        onMouseMove(e.touches[0]);
      }}
    >
      {Array.from(cards.values()).map((card) => (
        <Card
          card={card}
          key={card.id}
          onCardSelect={onCardSelect}
          onSelectEnd={() => setMovementDetails(undefined)}
        />
      ))}
    </div>
  );
};

export default Board;
