import React from "react";

export type CardProps = {
  id: string;
  owner: string;
  text: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    x: number;
    y: number;
  };
};

const Card: React.FC<CardProps> = ({ id, owner, text, position, size }) => {
  return (
    <div
      className="absolute border border-black rounded-md bg-white flex flex-col"
      style={{
        width: size.x,
        height: size.y,
        left: position.x,
        top: position.y,
      }}
    >
      <div className="w-full overflow-hidden flex flex-nowrap">
        <div className="text-red-500 text-base whitespace-nowrap flex-1 text-ellipsis flex-shrink-0 overflow-hidden">
          {owner}
        </div>
        <button className="material-icons ">close</button>
      </div>
      <div className="w-full">{text}</div>
    </div>
  );
};

export default Card;
