import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const MainLayout: React.FC = () => {
  const [startPos, setStartPos] = useState<{ x: number; y: number }>();
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-blue-light font-body p-5 pb-0"
      onTouchStart={(e) => {
        if (e.touches.length === 3) {
          setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length === 3 && startPos) {
          if (e.touches[0].clientX - 100 < startPos.x) {
            navigate(-1);
          }
        }
      }}
      onTouchEnd={() => {
        setStartPos(undefined);
      }}
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
