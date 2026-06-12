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