import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import "./Notes.css";
import Spinner from "./Spinner";

function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, loading } = context;

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
            </div>
            <div className="modal-body">
              <form action="/">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control modal-form py-2"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    placeholder="Title"
                    minLength={5}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control modal-form py-2"
                    id="edescription"
                    name="edescription"
                    rows="5"
                    value={note.edescription}
                    minLength={5}
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tags (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control modal-form py-2"
                    id="etag"
                    name="etag"
                    placeholder="Tags"
                    value={note.etag}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn save-btn"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 text-center">
        <h1>Your notes</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="container">
              {notes.length === 0 && (
                <div>
                  <h4 className="mt-3">You don't have any notes...🙃</h4>
                </div>
              )}
            </div>
            {notes.map((note) => {
              return (
                <NoteItem
                  key={note._id}
                  updateNote={updateNote}
                  showAlert={props.showAlert}
                  note={note}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default Notes;
