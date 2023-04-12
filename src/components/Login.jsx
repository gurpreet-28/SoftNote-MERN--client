import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import notes from "./notes.png";
import Loading from "./Loading";

function Login(props) {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const data = await response.json();
    setLoading(false);
    if (data.success) {
      // redirect
      localStorage.setItem("token", data.authToken);
      navigate("/");
      props.showAlert("Successfully logged in", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const handelChange = (event) => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container login-signup text-center">
        <div>
          <img src={notes} alt="notes" />
          <h1 className="mt-2">Login to Continue</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="email"
              className="form-control mx-auto p-3 login-signup-form"
              id="email"
              name="email"
              placeholder="Email Address"
              value={creds.email}
              onChange={handelChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control mx-auto p-3 login-signup-form"
              id="password"
              name="password"
              placeholder="Password"
              value={creds.password}
              onChange={handelChange}
            />
          </div>
          <button type="submit" className="btn login-signup-btn px-4">
            Login {loading && <Loading />}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
