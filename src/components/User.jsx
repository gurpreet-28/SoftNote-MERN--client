import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const User = () => {
  const host = process.env.REACT_APP_HOST;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <div className="container">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <div></div>
          <div>
            <div>
              Name: <h1>{name}</h1>
            </div>
            <div>
              Email: <h2>{email}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
