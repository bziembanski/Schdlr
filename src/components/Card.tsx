import React, { useRef, useState } from "react";

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
};

export type EventParams = Pick<
  React.MouseEvent<HTMLDivElement, MouseEvent>,
  "clientX" | "clientY" | "target"
>;

const Card: React.FC<CardProps> = ({ card, onCardSelect, onSelectEnd }) => {
  const { id, owner, position, size, text } = card;
  const parentRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown =
    (mode: MovementMode) =>
    (
      e: React.MouseEvent<HTMLDialogElement | HTMLButtonElement, MouseEvent> &
        React.TouchEvent<HTMLDialogElement | HTMLButtonElement>
    ) => {
      e.stopPropagation();
      const cords = e.touches ? e.touches[0] : e;
      if (mode === MovementMode.Moving) {
        onCardSelect(
          card.id,
          {
            x: cords.clientX - e.currentTarget.offsetLeft,
            y: cords.clientY - e.currentTarget.offsetTop,
          },
          mode
        );
      } else {
        const buttonPosition = e.currentTarget.getBoundingClientRect();
        const offsetInButton = {
          x: buttonPosition.width - (e.clientX - buttonPosition.left),
          y: buttonPosition.height - (e.clientY - buttonPosition.top),
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
        <button className="material-icons ">close</button>
      </div>
      <div className="w-full flex-grow">{text}</div>
      <div className="w-full flex justify-end">
        <button
          className="material-icons rotate-90"
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
