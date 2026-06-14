# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




 <div className="taskItem" key={item.id}>
              <div className="taskLeft">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {
                    setTasks(
                      tasks.map((task) =>
                        task.id === item.id
                          ? { ...task, completed: !task.completed }
                          : task,
                      ),
                    );
                  }}
                />
                <h4
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    opacity: item.completed ? 0.6 : 1,
                  }}
                >
                  {item.text}
                </h4>
              </div>

              <div className="taskRight">
                <span>🗓️{item.date}</span>
                <button className="editBtn">✏️</button>
                <button
                  className="deleteBtn"
                  onClick={() =>
                    setTasks(tasks.filter((task) => task.id !== item.id))
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          )





          const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const main = require("./database");
const Task = require("./models/users");

const app = express();

app.use(cors());
app.use(express.json());


// GET all tasks
app.get("/tasks", async (req, res) => {
  try{
  const tasks = await Task.find();
    res.json(tasks);
  }
  catch(err){
    res.send(err.message);
  } 
});


// ADD task
app.post("/tasks", async (req, res) => {
  try{
  const newTask = await Task.create(req.body);
  res.json(newTask);
  }
 catch(err){
    res.send(err.message);
  } 
});


// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try{
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
  }
  catch(err){
    res.send(err.message);
  } 
});


// UPDATE completed
app.put("/tasks/:id", async (req, res) => {
  try{
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTask);
}
catch(err){
    res.send(err.message);
  } 
});

main()
.then(async ()=>{
  console.log("connected successfully !");
   app.listen(process.env.PORT,()=>{
    console.log("listen at port 3000");
  })
})
.catch((err)=> console.log(err));