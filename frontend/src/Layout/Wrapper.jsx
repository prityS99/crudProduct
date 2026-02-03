import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

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
