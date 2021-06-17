import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import Navbar from "../components/Navbar";


const Task = ({ task, index, completeTask, removeTask}) => {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            <p className="p_tasks">{task.title}</p>
            <div className='div_btns'>
                <button onClick={() => completeTask(index)}>Complete</button>
                <button style={{ background: "red" }} onClick={() =>removeTask(index)}>X</button>
            </div>
        </div>
    )
}


const Todo = () => {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [value, setValue] = useState('')
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        setTasksRemaining(tasks.filter(task => !task.completed).length)
    })

    useEffect(() => {
        const data = localStorage.getItem("my-tasks");
        if (data) {
            setTasks(JSON.parse(data));
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("my-tasks", JSON.stringify(tasks))
    });

    const handleChange = e => {
        e.preventDefault();
        
        setValue(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        
        addTask(value)
    }

    const addTask = title => {
        if (title === '') {
            alert("Please, enter a task!")
        } else {
            const newTasks = [...tasks, { title, completed: false, user: auth.currentUser.uid }]
            setTasks(newTasks)
        }     
    };

    const completeTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks)
    }

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    return (
        <>
            <Navbar/>
            <div className="todo-container">
                <div className="header">TODO - ITEMS</div>
                <div>Pending tasks ({tasksRemaining})</div>
                <form>
                    <input
                        type="text"
                        className="input"
                        value={value}
                        placeholder="Add a new task"
                        onChange={handleChange}
                    />
                    <button className="add" onClick={handleSubmit}>Add Task</button>
                    <div className="tasks">
                        {tasks.length >= 1 ? tasks.map((task, index) => (
                            <>
                                {task.user === auth.currentUser.uid ?
                                    <Task
                                        key={index}
                                        task={task}
                                        index={index}
                                        completeTask={completeTask}
                                        removeTask={removeTask}
                                    />
                                : null}
                            </>
                        )) : 'Enter a Task'}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Todo;






