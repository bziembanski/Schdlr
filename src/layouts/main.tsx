import { Outlet } from "react-router-dom";
import React from "react";

const MainLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-blue-light font-body p-5">
      <Outlet />
    </div>
  );
};

export default MainLayout;
