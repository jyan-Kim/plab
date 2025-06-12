import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./page/login";
import SignUp from "./page/signup";
import Find from "./page/find";
import Main from "./page/main";
import Register from "./page/register";
import Profile  from "./page/profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/" element={<Main/>} />
        <Route path='register' element={<Register/>} />
        <Route path='profile' element={<Profile/>} />
      </Routes>
    </>
  );
}

export default App;
