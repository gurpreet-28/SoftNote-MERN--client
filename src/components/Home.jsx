import React from "react";
import Form from "./Form";

function Home(props) {
  return (
    <>
      <Form showAlert={props.showAlert} />
    </>
  );
}

export default Home;
