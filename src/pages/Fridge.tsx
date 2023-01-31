import Card, {
  CardProps,
  CardType,
  Cords,
  EventParams,
  MovementMode,
} from "../components/Card";
import React, { useEffect, useRef, useState } from "react";
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
import { useGesture, usePinch } from "@use-gesture/react";
import { useNavigate, useParams } from "react-router";

import collectionToData from "../utils/collectionToData";
import firestoreApp from "../firestoreApp";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTitleContext } from "../contexts/TitleContext";

const auth = getAuth(firestoreApp);

type MovementDetails = {
  id: string;
  offset: Cords;
  mode: MovementMode;
};

const getCardChange = (
  clientX: number,
  clientY: number,
  details: MovementDetails,
  card: CardType
): Partial<CardType> => {
  const { offset, mode } = details;

  if (mode === MovementMode.Moving) {
    return {
      position: { x: card.position.x - clientX, y: card.position.y - clientY },
    };
  } else {
    return {
      size: { x: card.size.x - clientX, y: card.size.y - clientY },
    };
  }
};

const Fridge: React.FC = () => {
  const [user] = useAuthState(auth);
  const { id = "" } = useParams();
  const [fridge] = useDocumentData(
    doc(getFirestore(firestoreApp), "boards", id)
  );
  const [cardsCol] = useCollection(
    query(collection(getFirestore(firestoreApp), `boards/${id}/cards`))
  );
  const [cards, setCards] = useState<CardType[]>([]);
  const [, setTitle] = useTitleContext();
  const [scrollTouchPos, setScrollTouchPos] = useState<Cords>();
  const ref = useRef<HTMLDivElement>(null);
  const [movementDetails, setMovementDetails] = useState<MovementDetails>();
  const [scale, setScale] = useState(1);
  const pinchRef = useGesture({
    onPinch: ({ offset: [s, a] }) => {
      setScale(s);
    },
    onTouchStart: (e) => {
      setScrollTouchPos({
        x: e.event.touches[0].clientX,
        y: e.event.touches[0].clientY,
      });
    },
    onTouchEnd: (e) => setScrollTouchPos(undefined),
    onTouchMove: (e) => {
      if (movementDetails) {
        onMouseMove({
          clientX: e.event.touches[0].clientX,
          clientY: e.event.touches[0].clientY,
        });
      } else if (scrollTouchPos && ref.current) {
        const touches = e.event.touches[0];
        const deltaY = scrollTouchPos.y - touches.clientY;
        const deltaX = scrollTouchPos.x - touches.clientX;

        setScrollTouchPos({
          x: touches.clientX,
          y: touches.clientY,
        });

        ref.current.scrollTop += deltaY;
        ref.current.scrollLeft += deltaX;
      }
    },
  });

  useEffect(() => {
    setCards(collectionToData(cardsCol));
  }, [cardsCol]);

  useEffect(() => {
    setTitle(fridge?.name);
    return () => {
      setTitle(undefined);
    };
  }, [fridge?.name]);

  const onMouseMove = (e: EventParams) => {
    if (!movementDetails || !scrollTouchPos) return;
    const { id } = movementDetails;
    const currentCard = cards.find((card) => card.id === id);
    if (!currentCard) return;
    const x = scrollTouchPos.x - e.clientX;
    const y = scrollTouchPos.y - e.clientY;
    const cardChange = getCardChange(
      x * (1 / scale),
      y * (1 / scale),
      movementDetails,
      currentCard
    );
    setScrollTouchPos({ x: e.clientX, y: e.clientY });

    setCards((cards) =>
      cards.map((card) => {
        if (card.id === id) {
          return { ...card, ...cardChange };
        }
        return card;
      })
    );
  };

  const onCardSelect = (
    id: string,
    offset: Cords,
    mode: MovementMode,
    { x, y }: { x: number; y: number }
  ) => {
    setMovementDetails({ id, offset, mode });
    setScrollTouchPos({ x, y });
  };

  const onCardSelectEnd = async () => {
    if (!movementDetails) return;
    syncCard(movementDetails.id);
    setMovementDetails(undefined);
    setScrollTouchPos(undefined);
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
      className="w-full h-full overflow-auto  scrollbar-thin  scrollbar-thumb-blue-dark scrollbar-track-transparent"
      ref={ref}
    >
      <div className="flex gap-2 fixed top-5 left-16 text-blue-dark">
        <button
          className="material-icons text-3xl md:text-4xl"
          onClick={() => addCard()}
        >
          add
        </button>
      </div>
      <div
        className="relative touch-none w-[5000px] h-[5000px]"
        onMouseMove={onMouseMove}
        style={{ zoom: scale }}
        {...pinchRef()}
      >
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
    </div>
  );
};

export default Fridge;
