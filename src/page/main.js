import Header from "../component/Header";
import Content from "../component/Content";
import Footer from "../component/Footer";
import NavBar from "../component/navbar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import mainImg from "../photo-1521731978332-9e9e714bdd20.avif";

const Main = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <img
        src={mainImg}
        alt="Main Image"
        className="w-full h-64 object-cover my-4"
      />
      <NavBar />
      <div className="mb-32">
        {" "}
        {/* Footer와의 간격 확보 */}
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
