require("dotenv").config();

const express = require("express");
const cors = require("cors");

const main = require("./database");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
  res.send("Todo API Running 🚀");
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// Database + Server Start
main()
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");

    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 3000}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });