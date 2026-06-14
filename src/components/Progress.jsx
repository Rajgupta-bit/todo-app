import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaTasks } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";

const Progress = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://todo-app-ugo7.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  const pending = total - completed;

  const today = new Date().toISOString().split("T")[0];

  const dueToday = tasks.filter((task) => task.date === today).length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progressContainer">
       <div className="dashboard progressdash">
          <h2 className="text">Progress</h2>
          <p className="text">Track your productivity and stay consistent</p>
        </div>

      <div className="middle2">
        <div className="card total">
          <div className="iconBox blue">
            <FaTasks className="cardIcon" />
          </div>

          <div>
            <h1>{total}</h1>
            <p>Total Task</p>
          </div>
        </div>

        <div className="card pending">
          <div className="iconBox orange">
            <MdPendingActions className="cardIcon" />
          </div>

          <div>
            <h1>{pending}</h1>
            <p>Pending</p>
          </div>
        </div>

        <div className="card completed">
          <div className="iconBox green">
            <IoCheckmarkDoneCircle className="cardIcon" />
          </div>

          <div>
            <h1>{completed}</h1>
            <p>Completed</p>
          </div>
        </div>

        <div className="card due">
          <div className="iconBox purple">
            <BsCalendar2DateFill className="cardIcon" />
          </div>

          <div>
            <h1>{dueToday}</h1>
            <p>Due Today</p>
          </div>
        </div>
      </div>

      <div className="overviewCard">
        <h2>Completion Overview</h2>

        <div className="circleWrapper">
          <div className="circle">
            <span>{progress}%</span>
          </div>

          <div className="details">
            <p>✅ Completed : {completed}</p>
            <p>⏳ Pending : {pending}</p>
            <p>📅 Due Today : {dueToday}</p>
            <p>📋 Total : {total}</p>
          </div>
        </div>

        <div className="progressBar">
          <div
            className="progressFill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
