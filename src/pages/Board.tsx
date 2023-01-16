import Card, {
  CardProps,
  CardType,
  Cords,
  EventParams,
  MovementMode,
} from "../components/Card";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
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
import { useNavigate, useParams } from "react-router";

import collectionToData from "../utils/collectionToData";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTitleContext } from "../contexts/titleContext";

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
  const [board] = useDocumentData(
    doc(getFirestore(firestoreApp), "boards", id)
  );
  const [cardsCol] = useCollection(
    query(collection(getFirestore(firestoreApp), `boards/${id}/cards`))
  );
  const [cards, setCards] = useState<CardType[]>([]);
  const [, setTitle] = useTitleContext();

  useEffect(() => {
    setCards(collectionToData(cardsCol));
  }, [cardsCol]);

  useEffect(() => {
    setTitle(board?.name);
    return () => {
      setTitle(undefined);
    };
  }, [board?.name]);

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

  const addCard = async () => {
    const card: Omit<CardType, "id"> = {
      owner: user?.email ?? "",
      position: { x: 100, y: 100 },
      size: { x: 100, y: 100 },
      text: "New Card",
    };
    addDoc(collection(getFirestore(firestoreApp), "boards", id, "cards"), card);
  };

  const deleteCard = (cardId: string) => () => {
    deleteDoc(doc(getFirestore(firestoreApp), "boards", id, "cards", cardId));
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

  const onCardTextChange = (cardId: string, text: string) => {
    const card = cards.find((card) => card.id == cardId);
    if (!card) return;
    const docRef = doc(
      getFirestore(firestoreApp),
      "boards",
      id,
      "cards",
      cardId
    );
    updateDoc(docRef, { ...card, text: text });
  };

  return (
    <div
      className="w-full h-full relative"
      onMouseMove={onMouseMove}
      onTouchMove={(e) => {
        onMouseMove(e.touches[0]);
      }}
    >
      <div className="flex gap-2 fixed top-5 left-16 text-blue-dark">
        <button
          className="material-icons text-3xl md:text-4xl"
          onClick={() => addCard()}
        >
          add
        </button>
      </div>
      {Array.from(cards.values()).map((card) => (
        <Card
          card={card}
          key={card.id}
          onCardSelect={onCardSelect}
          onSelectEnd={onCardSelectEnd}
          onDelete={deleteCard(card.id)}
          onTextEdit={onCardTextChange}
        />
      ))}
    </div>
  );
};

export default Board;
