import Card, {
  CardProps,
  CardType,
  Cords,
  EventParams,
  MovementMode,
} from "../components/Card";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getFirestore,
  query,
  updateDoc,
} from "firebase/firestore";
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

const getCardChange = (
  clientX: number,
  clientY: number,
  details: MovementDetails
): Partial<CardType> => {
  const { offset, mode } = details;

  const x = clientX - offset.x;
  const y = clientY - offset.y;
  if (mode === MovementMode.Moving) {
    return {
      position: { x, y },
    };
  } else {
    return {
      size: { x, y },
    };
  }
};

const Board: React.FC = () => {
  const [user] = useAuthState(auth);
  const { id = "" } = useParams();
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
    const { id } = movementDetails;
    const currentCard = cards.find((card) => card.id === id);
    if (!currentCard) return;

    const cardChange = getCardChange(e.clientX, e.clientY, movementDetails);

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

  const onCardSelectEnd = async () => {
    if (!movementDetails) return;
    syncCard(movementDetails.id);
    setMovementDetails(undefined);
  };

  const syncCard = async (cardId: string) => {
    const card = cards.find((card) => card.id === cardId);
    if (!card) return;
    const docRef = doc(
      getFirestore(firestoreApp),
      "boards",
      id,
      "cards",
      cardId
    );
    updateDoc(docRef, card);
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
          onSelectEnd={onCardSelectEnd}
        />
      ))}
    </div>
  );
};

export default Board;
