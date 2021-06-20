import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import router from 'next/router';
import { useRouter } from 'next/router';


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
    const [useruid, setUseruid] = useState()
    const router = useRouter();


    useEffect(() => {
        setTasksRemaining(tasks.filter(task => !task.completed).length)
    })

    useEffect(() => {
        const data = localStorage.getItem("my-tasks");
        if (data) {
            setTasks(JSON.parse(data));
        }

        setUseruid(localStorage.getItem("useruid"));

    },[]);

    useEffect(() => {
        localStorage.setItem("my-tasks", JSON.stringify(tasks))
    });

    useEffect(() => {
        setUseruid(localStorage.getItem("useruid"));
    },[tasks])

    const handleChange = e => {
        e.preventDefault();
        setValue(e.target.value)
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        addTask(value)
        setValue('')
    }

    const addTask = title => {
        if (title === '') {
            alert("Please, enter a task!")
        } else {
            const newTasks = [...tasks, { title, completed: false, user: useruid }]
            setTasks(newTasks)
        }     
    };

    const completeTask = (index,e) => {
        e.preventDefault()
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks)
    }

    const removeTask = (index, e) => {
        e.preventDefault()
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    return (
            
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
                {!useruid ?
<>
                                    <button className="add" onClick={(e) => (e.preventDefault(), router.push('/signup'))}>Add Task</button>
</>
                :
                                    <button className="add" onClick={handleSubmit}>Add Task</button>
}
                    <div className="tasks" >
                        {tasks.length >= 1 ? tasks.map((task, index) => (
                            <div key={index}>
                                {(task.user === useruid.replace(/['"]+/g, '')) || (task.user === useruid) ?
                                    // <Task
                                    //     key={index}
                                    //     task={task}
                                    //     index={index}
                                    //     completeTask={completeTask}
                                    //     removeTask={removeTask}
                                    // />
                                    <div
                                        className="task"
                                        style={{ textDecoration: task.completed ? "line-through" : "" }}
                                    >
                                        <p className="p_tasks">{task.title}</p>
                                        {useruid ? 
                                        
                                            <div className='div_btns'>
                                                <button onClick={(e) => completeTask(index, e)}>Complete</button>
                                                <button style={{ background: "red" }} onClick={(e) =>removeTask(index,e)}>X</button>
                                            </div>
                                        :
                                            <div className='div_btns'>
                                                <button onClick={() => router.push('/signup')}>Complete</button>
                                                <button style={{ background: "red" }} onClick={() => router.push('/signup')}>X</button>
                                            </div>    
                                        }
                                    </div>
                                : null}
                            </div>
                        )) : 'Enter a Task'}
                    </div>
                </form>
            </div>
    )
}

export default Todo;






