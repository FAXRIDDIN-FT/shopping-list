import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <MainLayout>
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="avatar">{name?.charAt(0)?.toUpperCase()}</div>
          <div className="info">
            <h2>{name}</h2>
            <span className="badge">Active</span>
            <p className="username">{username}</p>
          </div>
          <div className="actions">
            <button className="copy-btn">📋 Copy Username</button>
            <button className="delete-btn" onClick={logOut}>🗑 Delete Account</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
