import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import notes from "./notes.png";

function About() {
  let navigate = useNavigate();

  const handleStart = () => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container text-center about">
        <div>
          <img src={notes} alt="notes-img" />
          <h1 className="mt-2">SoftNote</h1>
        </div>
        <div className="container short-sum mt-3">
          <p>
            <span className="fw-semibold">SoftNote</span> is designed to help
            users efficiently capture, organize, and manage their notes. Whether
            used for academic or personal purposes, it provides a user-friendly
            interface that enables quick and easy note-taking, editing, and
            sharing. Its features include customizable note formatting,
            tag-based organization, and cross-platform synchronization, allowing
            users to access their notes from anywhere, on any device.
            Additionally, this app is designed with privacy and security in
            mind, with features such as password protection and end-to-end
            encryption.
          </p>
          <div className="text-center">
            <button
              className="btn start-btn my-4 py-3 px-5"
              onClick={handleStart}
            >
              Start Taking Notes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
