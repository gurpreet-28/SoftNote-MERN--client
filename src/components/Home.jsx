import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

function Home(props) {
  let navigate = useNavigate();

  return (
    <>
      <Form showAlert={props.showAlert} />
    </>
  );
}

export default Home;
