import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/tasks").then(res => setTasks(res.data));
    }, []);

    const addTask = () => {
        axios.post("http://localhost:5000/tasks", { name: newTask })
            .then(res => setTasks([...tasks, res.data]));
        setNewTask("");
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)));
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

export default App;
