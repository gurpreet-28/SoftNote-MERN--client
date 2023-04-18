import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notes from "./notes.png";
import "./LoginSignup.css";
import Loading from "./Loading";

function Signup(props) {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: creds.name,
        email: creds.email,
        password: creds.password,
      }),
    });
    const data = await response.json();
    setLoading(false);
    // redirect
    if (data.success === true) {
      console.log(data);
      localStorage.setItem("token", data.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const handelChange = (event) => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };
  return (
    <div className="container text-center login-signup">
      <div>
        <img src={notes} alt="notes" />
        <h2>Join SoftNote.</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control mx-auto p-3 login-signup-form"
            id="name"
            name="name"
            placeholder="Full Name"
            value={creds.name}
            onChange={handelChange}
            aria-describedby="emailHelp"
          />
        </div>
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
        <div className="mb-2">
          <input
            type="password"
            className="form-control mx-auto p-3  login-signup-form"
            id="password"
            name="password"
            placeholder="Password"
            minLength={5}
            required
            value={creds.password}
            onChange={handelChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="cpassword"
            className="form-control mx-auto p-3 login-signup-form"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            minLength={5}
            required
            value={creds.cpassword}
            onChange={handelChange}
          />
        </div>
        {loading ? (
          <button className="loading-btn px-4 py-2">
            <Loading />
          </button>
        ) : (
          <button type="submit" className="login-signup-btn px-4 py-2">
            Signup
          </button>
        )}
      </form>
    </div>
  );
}

export default Signup;
