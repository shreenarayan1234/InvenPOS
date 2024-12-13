import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../partials/Footer";
import SideBar from "../partials/SideBar";
import Nav from "../partials/Nav";

const Master = () => {
  return (
    <>
      <Nav />
      <div id="layoutSidenav">
        <SideBar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Master;
