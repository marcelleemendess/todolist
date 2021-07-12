import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';


const Todo = ({user}) => {
    const [value, setValue] = useState('')
    const [tasks, setTasks] = useState([]);
    const router = useRouter();
    const useruid = user?.uid || ""
    const [fbAction, setFbAction] = useState()
    const [changeDocId, setChangeDocId] = useState()
    
    //LOADING TASKS ON MOUNT
    useEffect(async() => {
        // if data in ls, then set task state to that data
        const data = localStorage.getItem("my-tasks");
        let newData = []
        
        await db.collection("my-tasks").where("useruid", "==", useruid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    newData.push(doc.data())
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        if (newData) {
            // setTasks(JSON.parse(data));
            setTasks(newData)
        }
        // set useruid to ls useruid (always have this if someone logged in because it is stored on signup.js)
        // setUseruid(localStorage.getItem("useruid"));
    },[useruid]);

    // UPDATING TASKS ON STATE CHANGE
    // persist tasks in local storage: after adding the new task to existing task state, replace the task state with the new tasks object
    useEffect(async () => {
        // localStorage.setItem("my-tasks", JSON.stringify(tasks))
        const docRef = db.collection("my-tasks").doc(changeDocId);
        if(fbAction==='completeTask') {            
            return await docRef.update({
                    completed: true
            })
        }
        if(fbAction==='removeTask') {
            docRef.delete()
        }

        if(fbAction==='addTask') {
            docRef.set({
                title: value,
                docid: changeDocId,
                completed: false,
                useruid: useruid
            })
        }
    }, [tasks])



    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(value)
        setValue('')
    }

    const addTask = (title) => {
        if (title === '') {
            alert("Please, enter a task!")
        } else {
            const docid = uuidv4()
            const newTasks = [...tasks, { title, completed: false, user: useruid, docid: docid }]
            setTasks(newTasks)
            setFbAction('addTask')
            setChangeDocId(docid)
        }     
    };

    const completeTask = (index,e, docid) => {
        e.preventDefault()
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks)
        setFbAction('completeTask')
        setChangeDocId(docid)
    }

    const removeTask = (index, e, docid) => {
        e.preventDefault()
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
        setFbAction('removeTask')
        setChangeDocId(docid)
    }

    return (
            
        <div className="todo-container">
            <div className="header">TODO - ITEMS</div>
            <form>
                <input
                    type="text"
                    className="input"
                    value={value}
                    placeholder="Add a new task"
                    onChange={(e) => setValue(e.target.value)}
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
                            {/* {(task.user === useruid.replace(/['"]+/g, '')) || (task.user === useruid) ? */}
                                <div
                                    className="task"
                                    style={{ textDecoration: task.completed ? "line-through" : "" }}
                                >
                                    <p className="p_tasks">{task.title}</p>
                                    {useruid ? 
                                    
                                        <div className='div_btns'>
                                            <button onClick={(e) => completeTask(index, e, task.docid)}>Complete</button>
                                            <button style={{ background: "red" }} onClick={(e) =>removeTask(index,e, task.docid)}>X</button>
                                        </div>
                                    :
                                        <div className='div_btns'>
                                            <button onClick={() => router.push('/signup')}>Complete</button>
                                            <button style={{ background: "red" }} onClick={() => router.push('/signup')}>X</button>
                                        </div>    
                                    }
                                </div>
                            {/* : null} */}
                        </div>
                    )) : 'Enter a Task'}
                </div>
            </form>
        </div>
    )
}

export default Todo;






