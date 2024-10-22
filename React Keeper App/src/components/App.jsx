import React from "react";
import reactDom from "react-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [noteList, addList] = React.useState([]);

  function handleAdd(newNote) {
    addList((preList) => {
      return [...preList, newNote];
    });
  }

  function handleDel(id) {
    addList((preList) => {
      return preList.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onClicked={handleAdd} />
      {noteList.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDel={handleDel}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
