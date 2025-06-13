import axios from "axios";
import React, { useEffect } from "react";
import shopping from "../../assets/shoppin_list.jpg";
import "../Register/style.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    let newUser = {
      name: e.target[0].value,
      username: e.target[1].value,
      password: e.target[2].value,
    };
    localStorage.setItem("name", newUser.name);
    localStorage.setItem("username", newUser.username);
    let res = await axios.post(
      "https://nt-shopping-list.onrender.com/api/users",
      newUser
    );
    localStorage.setItem("token", res.data.token);
    console.log(res);
  };
  return (
    <div>
    
      <div className="register-container">
        <div className="register-box">
          <img className="register-image" src={shopping} alt="shopping list" />
          <form onSubmit={onSubmit} className="register-form">
            <input type="text" placeholder="name" />
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button type="submit">Sign Up</button>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor.
                <Link to="/login">Login in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
