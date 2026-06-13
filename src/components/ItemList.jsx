import React from "react";
import axios from "axios";

const ItemList = ({ item, tasks, setTasks }) => {
  const handleCheck = async () => {
    const updatedCompleted = !item.completed;
    const token = localStorage.getItem("token");

    await axios.put(`https://todo-app-ugo7.onrender.com/api/tasks/${item._id}`, {
      completed: updatedCompleted,
    },
     {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );

    setTasks(
      tasks.map((task) =>
        task._id === item._id
          ? { ...task, completed: updatedCompleted }
          : task
      )
    );
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await axios.delete(`https://todo-app-ugo7.onrender.com/api/tasks/${item._id}`,
       {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    );

    setTasks(tasks.filter((task) => task._id !== item._id));
  };

  const handleEdit = async () => {
  const newText = prompt("Enter new task", item.text);

  if (!newText || newText.trim() === "") return;

  const token = localStorage.getItem("token");

  const res = await axios.put(
    `https://todo-app-ugo7.onrender.com/api/tasks/${item._id}`,
    {
      text: newText,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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