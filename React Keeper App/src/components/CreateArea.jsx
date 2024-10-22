import React from "react";

function CreateArea(props) {
  const [newNote, addNote] = React.useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    addNote((preNote) => {
      return {
        ...preNote,
        [name]: value,
      };
    });
  }

  //Them vao note list

  function addNoteIntoList(event) {
    props.onClicked(newNote);
    addNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={addNoteIntoList}>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={newNote.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={newNote.content}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
