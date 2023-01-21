import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const data = await response.json();
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
    <div className="container">
      <h1>Login to Continue</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={creds.email}
            onChange={handelChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={creds.password}
            onChange={handelChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
