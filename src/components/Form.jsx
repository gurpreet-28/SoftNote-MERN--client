import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import "./Form.css";

function Form(props) {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const context = useContext(noteContext);
  const { addNote } = context;

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Note added successfully", "success");
  };
  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container my-3 text-center form">
        <h1 className="mb-3">Add a note</h1>
        <form>
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-el py-2 px-3"
              id="title"
              name="title"
              placeholder="Title"
              minLength={5}
              required
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control form-el py-2 px-3"
              id="description"
              name="description"
              rows="10"
              placeholder="Add your note..."
              minLength={5}
              required
              value={note.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-el py-2 px-3"
              id="tag"
              name="tag"
              placeholder="Tags (optional)"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn add-btn px-5 mt-2"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
