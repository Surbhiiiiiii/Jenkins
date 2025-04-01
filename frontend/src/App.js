import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios.get(`${API_URL}/tasks`)
            .then(res => setTasks(res.data))
            .catch(err => console.error("Error fetching tasks:", err));
    }, []);
    

    const addTask = () => {
        axios.post("http://localhost:5000/tasks", { name: newTask })
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.error("Error adding task:", err));
        setNewTask("");
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.error("Error deleting task:", err));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.name} <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                {/* Automatically redirect from "/" to "/tasks" */}
                <Route path="/" element={<Navigate to="/tasks" />} />
                <Route path="/tasks" element={<TaskManager />} />
            </Routes>
        </Router>
    );
}

export default App;
