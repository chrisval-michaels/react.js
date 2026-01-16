import React, { useEffect, useState } from "react";
import "./App.css";
import { FaTrash } from "react-icons/fa";


import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyDp3zeJHHwzapr7Mpspx77X56RLbdWo5G4",
  authDomain: "todo-app-125d4.firebaseapp.com",
  projectId: "todo-app-125d4",
  storageBucket: "todo-app-125d4.firebasestorage.app",
  messagingSenderId: "27747739562",
  appId: "1:27747739562:web:ceeb6fa02e2dc8747fadd3",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Banner() {
  return <h1>Todo Firebase Example</h1>;
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading todos from Firebase...");
      const todosCol = collection(db, "todos");
      const todoSnapshot = await getDocs(todosCol);

      const todos = todoSnapshot.docs.map((docSnap) => ({
        text: docSnap.data().text,
        id: docSnap.id,
      }));

      setItems(todos);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!itemText.trim()) return;

    let newItem = { text: itemText };
    const docRef = await addDoc(collection(db, "todos"), newItem);

    newItem.id = docRef.id;

    setItems([...items, newItem]);
    setItemText("");
  };


  const removeItem = async (item) => {
    await deleteDoc(doc(db, "todos", item.id));

    const filtered = items.filter((i) => i.id !== item.id);
    setItems(filtered);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          placeholder="Write a new todo here"
        />
        <input type="submit" value="Add" />
      </form>

      {loading && <p>Loading...</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <FaTrash
              onClick={() => removeItem(item)}
              style={{ cursor: "pointer", color: "red" }}
            />
          </li>
        ))}
      </ul>
    </div>
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
