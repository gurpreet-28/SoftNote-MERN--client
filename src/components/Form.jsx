import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

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
      <div className="container my-3">
        <h1>Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title"
              minLength={5}
              required
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="8"
              minLength={5}
              required
              value={note.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Tags"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
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
