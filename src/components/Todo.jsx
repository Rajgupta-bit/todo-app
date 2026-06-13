import axios from "axios";
import React, { useState, useEffect } from "react";
import user from "../assets/user.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import ItemList from "./ItemList";

const Todo = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dueFilter, setDueFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://todo-app-ugo7.onrender.com/tasks");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim() === "" || date === "") {
      alert("Please fill all fields");
      return;
    }
    const newTask = {
      text: task,
      date: date,
      completed: false,
    };

    try {
      await axios.post("https://todo-app-ugo7.onrender.com/tasks", newTask);

      fetchTasks();

      setTask("");
      setDate("");
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter((item) => {
    // status filter
    if (filter === "pending" && item.completed) return false;

    if (filter === "completed" && !item.completed) return false;

    // due date filter
    if (dueFilter === "today" && item.date !== today) return false;

    if (dueFilter === "upcoming" && item.date <= today) return false;

    if (dueFilter === "overdue" && !(item.date < today && !item.completed))
      return false;

    // search filter
    if (
      searchText !== "" &&
      !item.text.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <main className="body">
      <div className="header">
        <div className="dashboard">
          <h2 className="text">Dashboard</h2>
          <p className="text">stay organized and get thing done</p>
        </div>

        <div className="top-icons">
          {/* <div className="bell">
            <IoNotificationsOutline className="bellIcon" />
            <span>3</span>
          </div> */}

          <div className="profile">
            <FaUserCircle className="profileIcon" />

            <div className="profileMenu">
              <p>👤 Raj Gupta</p>
              <p>📧 raj@gmail.com</p>

              <button>Profile</button>
              <button>Settings</button>
            </div>
          </div>
        </div>
      </div>

      <div className="middle1">
        <div className="middle1child">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="what do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            type="date"
            id="dateBox"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          

          <button className="addtask" onClick={handleAddTask}>
            + Add Task
          </button>
        </div>
      </div>

      <div className="middle2">
        <div className="card total">
          <div className="iconBox blue">
            <FaTasks className="cardIcon" />
          </div>

          <div>
            <h1>{tasks.length}</h1>
            <p>Total Task</p>
          </div>
        </div>

        <div className="card pending">
          <div className="iconBox orange">
            <MdPendingActions className="cardIcon" />
          </div>

          <div>
            <h1>{tasks.filter((task) => !task.completed).length}</h1>
            <p>Pending</p>
          </div>
        </div>

        <div className="card completed">
          <div className="iconBox green">
            <IoCheckmarkDoneCircle className="cardIcon" />
          </div>

          <div>
            <h1>{tasks.filter((task) => task.completed).length}</h1>
            <p>Completed</p>
          </div>
        </div>

        <div className="card due">
          <div className="iconBox purple">
            <BsCalendar2DateFill className="cardIcon" />
          </div>

          <div>
            <h1>
              {
                tasks.filter(
                  (task) =>
                    task.date === new Date().toISOString().split("T")[0],
                ).length
              }
            </h1>
            <p>Due Today</p>
          </div>
        </div>
      </div>

      <div className="middle3">
        <div className="box1">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Complete
          </button>
        </div>
        <div className="box2">
          <div className="searchTask">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search Task..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="selectDate">
            <select onChange={(e) => setDueFilter(e.target.value)}>
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>
    <div className="middle4">
      <div className="taskList">
        {tasks.length === 0 ? (
          <p className="emptyText">No tasks added yet</p>
        ) : filteredTasks.length === 0 ? (
          <p className="emptyText">
            {filter === "pending"
              ? "No pending tasks ⏳"
              : filter === "completed"
                ? "No task completed"
                : "No matching task found 🔍"}
          </p>
        ) : (
          filteredTasks.map((item) => {
            return (
              <ItemList
                key={item.id}
                item={item}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
          })
        )}
      </div>
     </div> 
    </main>
  );
};

export default Todo;
