const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
    

const TaskSchema = new mongoose.Schema({ name: String });
const Task = mongoose.model("Task", TaskSchema);

// Routes
app.get("/tasks", async (req, res) => {  // Fix GET route
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {  // Fix POST route
    const task = new Task({ name: req.body.name });
    await task.save();
    res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {  // Fix DELETE route
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
