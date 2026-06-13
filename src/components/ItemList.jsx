import React from "react";
import axios from "axios";

const ItemList = ({ item, tasks, setTasks }) => {
  const handleCheck = async () => {
    const updatedCompleted = !item.completed;

    await axios.put(`https://todo-app-ugo7.onrender.com/api/tasks/${item._id}`, {
      completed: updatedCompleted,
    });

    setTasks(
      tasks.map((task) =>
        task._id === item._id
          ? { ...task, completed: updatedCompleted }
          : task
      )
    );
  };

  const handleDelete = async () => {
    await axios.delete(`https://todo-app-ugo7.onrender.com/api/tasks/${item._id}`);

    setTasks(tasks.filter((task) => task._id !== item._id));
  };

  const handleEdit = async () => {
    const newText = prompt("Enter new task", item.text);

    if (!newText || newText.trim() === "") return;

    const res = await axios.put(`http://localhost:3000https://todo-app-ugo7.onrender.com/api/tasks/${item._id}`, {
      text: newText,
    });

    setTasks(
      tasks.map((task) =>
        task._id === item._id ? res.data : task
      )
    );
  };

  return (
    <div className="taskItem">
      <div className="taskLeft">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleCheck}
        />

        <h4 className={item.completed ? "completeText" : ""}>
          {item.text}
        </h4>
      </div>

      <div className="taskRight">
        <span>🗓️ {item.date}</span>

        <button className="editBtn" onClick={handleEdit}>
          ✏️
        </button>

        <button className="deleteBtn" onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ItemList;