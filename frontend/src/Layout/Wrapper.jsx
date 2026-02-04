import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Wrapper = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Sidebar />
    </div>
  );
};

export default Wrapper;
