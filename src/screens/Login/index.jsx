import React, { useState } from "react";
import "./style.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { SignIn } from "../../services";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [details, setdetails] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setdetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const signIn = async () => {
    console.log(details);
    SignIn(details)
      .then((res) => {
        if (res?.data) {
         
           navigate(`/dashboard/${res?.data?.id}`);
        }
       
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div>
        <h3 className="heading">Venue Admin Login</h3>
        <input
          type="text"
          className="username"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <div
          className="username"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="password"
            id="password"
            onChange={handleChange}
          />
          <div
            className="icon"
            onClick={() => setshowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>

        <button className="btn" onClick={signIn}>
          Sign In
        </button>
        <p className="reg" style={{textAlign:"center", margin:'auto'}}>New Registration ?</p>
      </div>
    </div>
  );
};

export default Login;
