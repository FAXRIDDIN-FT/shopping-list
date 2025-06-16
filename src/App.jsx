import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Groups from "./pages/group/Groups";
import Group from "./pages/group-ditels/group";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404 not found</h1>} />
        <Route path="/home" element={<MainLayout />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:id" element={<Group/>} />
      </Routes>
    </div>
  );
}

export default App;
