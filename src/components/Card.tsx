import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Textarea from "./Textarea";

export type Cords = {
  x: number;
  y: number;
};

export enum MovementMode {
  Moving = 1,
  Resizing = 2,
}

export type CardType = {
  id: string;
  owner: string;
  text: string;
  position: Cords;
  size: Cords;
};

export type CardProps = {
  card: CardType;
  onSelectEnd: () => void;
  onCardSelect: (id: string, offset: Cords, mode: MovementMode) => void;
  onDelete: () => void;
  onTextEdit: (id: string, text: string) => void;
};

export type EventParams = Pick<
  React.MouseEvent<HTMLDivElement, MouseEvent>,
  "clientX" | "clientY" | "target"
>;

const Card: React.FC<CardProps> = ({
  card,
  onCardSelect,
  onSelectEnd,
  onDelete,
  onTextEdit,
}) => {
  const { id, owner, position, size, text } = card;
  const [internalText, setInternalText] = useState(text);
  const { transcript, listening, finalTranscript, resetTranscript } =
    useSpeechRecognition();
  const [isEdit, setIsEdit] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInternalText(text);
  }, [text]);

  useEffect(() => {
    if (!listening && isEdit) {
      onTextEdit(id, transcript);
      setIsEdit(false);
      resetTranscript();
    }
  }, [listening]);

  const toggleEdit = () => {
    setIsEdit((edit) => {
      onTextEdit(id, internalText);
      return !edit;
    });
  };

  const onMouseDown =
    (mode: MovementMode) =>
    (
      e: React.MouseEvent<HTMLDialogElement | HTMLButtonElement, MouseEvent> &
        React.TouchEvent<HTMLDialogElement | HTMLButtonElement>
    ) => {
      e.stopPropagation();
      if (isEdit) return;
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      if (mode === MovementMode.Moving) {
        onCardSelect(
          card.id,
          {
            x: clientX - e.currentTarget.offsetLeft,
            y: clientY - e.currentTarget.offsetTop,
          },
          mode
        );
      } else {
        const buttonPosition = e.currentTarget.getBoundingClientRect();

        const offsetInButton = {
          x: buttonPosition.width - (clientX - buttonPosition.left),
          y: buttonPosition.height - (clientY - buttonPosition.top),
        };
        const bounding = parentRef.current?.getBoundingClientRect();
        if (!bounding) return;
        const actionOffset = {
          x: bounding.left - offsetInButton.x,
          y: bounding.top - offsetInButton.y,
        };
        onCardSelect(card.id, actionOffset, mode);
      }
    };

  return (
    <div
      className="absolute border border-black rounded-md bg-white flex flex-col"
      style={{
        width: size.x,
        height: size.y,
        left: position.x,
        top: position.y,
      }}
      ref={parentRef}
      onMouseDown={onMouseDown(MovementMode.Moving)}
      onMouseUp={onSelectEnd}
      onTouchStart={onMouseDown(MovementMode.Moving)}
      onTouchEnd={onSelectEnd}
    >
      <div className="w-full overflow-hidden flex flex-nowrap">
        <div className="text-red-500 text-base whitespace-nowrap flex-1 text-ellipsis flex-shrink-0 overflow-hidden">
          {owner}
        </div>
        <button className="material-icons" onClick={onDelete}>
          close
        </button>
      </div>
      <div className="w-full flex-grow">
        {isEdit ? (
          <Textarea
            value={listening ? transcript : internalText}
            onChange={(e) => {
              if (!listening) setInternalText(e.target.value);
            }}
            containerClassName="h-full max-h-full"
            className="text-sm h-full overflow-hidden"
            inputClassName="sm:bg-[#fff] k text-blue-500 h-full  resize-none"
          />
        ) : (
          text
        )}
      </div>
      <div className="w-full flex">
        <button className="material-icons" onClick={toggleEdit}>
          edit
        </button>
        <button
          className="material-icons"
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              setIsEdit(true);
              SpeechRecognition.startListening({ continuous: true });
            }
          }}
        >
          mic
        </button>
        <button
          className="material-icons rotate-90 ml-auto"
          onMouseDown={onMouseDown(MovementMode.Resizing)}
          onTouchStart={onMouseDown(MovementMode.Resizing)}
        >
          open_in_full
        </button>
      </div>
    </div>
  );
};

export default Card;
