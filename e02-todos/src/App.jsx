import React, { useState } from 'react';
import './App.css';
import { FaEdit, FaTrash } from "react-icons/fa";

function Banner() {
  return (
    <h1>Todo Example with React</h1>
  );
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!itemText.trim()) return;

    if (isEditing) {
      setItems(items.map(item =>
        item.id === editId ? { ...item, text: itemText } : item
      ));
      setIsEditing(false);
      setEditId(null);
    } else {
      setItems([...items, { id: Math.random(), text: itemText }]);
    }
    setItemText("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (id) => {
    const item = items.find(i => i.id === id);
    setItemText(item.text);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          placeholder="Write a new todo here"
        />
        <input type="submit" value={isEditing ? "Update" : "Add"} />
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}{" "}
            <FaEdit onClick={() => editItem(item.id)} style={{cursor:"pointer", marginRight:"10px"}} />
            <FaTrash onClick={() => removeItem(item.id)} style={{cursor:"pointer"}} />
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  return (
    <>
      <Banner />
      <ToDoFormAndList />
    </>
  );
}

export default App;
