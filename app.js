const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];
let nextId = 1;

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Create a new task
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    const task = {
        id: nextId++,
        title: title
    };

    tasks.push(task);

    res.status(201).json(task);
});

// Get task by ID
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(index, 1);

    res.json({ message: "Task deleted successfully" });
});

// Update a task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.title = title;

    res.json(task);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});