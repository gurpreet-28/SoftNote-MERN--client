import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-3">
        <div className="card text-center my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i
              className="fas fa-sloid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note Deleted Successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <div className="card-footer text-muted">
            {new Date(note.date).toLocaleString()}
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
