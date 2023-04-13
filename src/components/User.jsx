import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Spinner from "./Spinner";
import profile from "./profile.svg";

const User = () => {
  const host = process.env.REACT_APP_HOST;
  let navigate = useNavigate();

  const handleStart = () => {
    navigate("/notes");
  };

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setLoading(false);
    setName(data.name);
    setEmail(data.email);
    setDate(data.date);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <div className="container">
          <Spinner />
        </div>
      ) : (
        <div className="container text-center">
          <div>
            <img src={profile} alt="profile" className="user-profile-icon" />
          </div>
          <div className="user-profile">
            <h4>
              <span>Name: </span> <span className="user-data">{name}</span>
            </h4>
            <h4>
              <span>Email: </span> <span className="user-data">{email}</span>
            </h4>
            <h4>
              <span>Joined on: </span>
              <span className="user-data">
                {new Date(date).toLocaleDateString()}
              </span>
            </h4>
          </div>
          <div className="text-center">
            <button
              className="btn start-btn my-5 py-3 px-5"
              onClick={handleStart}
            >
              My notes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
