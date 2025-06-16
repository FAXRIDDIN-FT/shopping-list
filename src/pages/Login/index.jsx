import axios from "axios";
import React from "react";
import shopping from "../../assets/shoppin_list.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Register/style.css";

function Login() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return navigate("/");
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    let user = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
  
    let res = await axios.post(
      "https://nt-shopping-list.onrender.com/api/auth",
      user
    );
    localStorage.setItem("token", res.data.token);
    console.log(res);
    if (res.status === 200) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-box">
          <img className="register-image" src={shopping} alt="shopping list" />
          <form onSubmit={onSubmit} className="register-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button type="submit">Sign Up</button>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor.
                <Link to="/register">Create </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
