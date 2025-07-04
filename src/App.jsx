import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import useDarkMode from "./darkMode/useDarkMode";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Router from "./Router";

function App() {
  const [dark, setDark] = useDarkMode(); //
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen transition">
      {!hideLayout && <Header dark={dark} setDark={setDark} />}
      <div className="mt-12 mb-12">
        <Router />
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
