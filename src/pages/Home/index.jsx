import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import "./home.css";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [profile,setProfile]=useState(null)
  const name = localStorage.getItem("name");
  const username = localStorage.getItem("username");
  useEffect(()=>{
    (async()=>{
    let {data} =await axios.get(`https://nt-shopping-list.onrender.com/api/auth`,{
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      }
    })
    if(data){
      setProfile(data)
    }
    
  })()
  },[])
  console.log(profile);
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
          <div className="avatar">{profile?.name?.charAt(0)?.toUpperCase()}</div>
          <div className="info">
            <h2>{name}</h2>
            <span className="badge">{profile?.status}</span>
            <p className="username">{profile?.username}</p>
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
