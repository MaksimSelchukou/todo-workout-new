import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolists";

export type fiteredType = "all" | "active" | "completed"


export type tasksType = {
    id: string
    title: string
    isDone: boolean
}


export function App() {


    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS+++", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    let [filter, setFilter] = useState<fiteredType>('all')
    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(f => !f.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(f => f.isDone)
    }


    const changeFilter = (value:fiteredType)=>{
        setFilter(value)
    }

    const removeTask = (taskID: string) => {
        let filteredTask = tasks.filter(f => f.id !== taskID)
        setTasks(filteredTask)
    }

    const addTask = (title:string)=>{
        let newTask = {id:v1(),title:title,isDone:false}
        setTasks([newTask,...tasks])
    }

    const changeStatus = (taskID:string,newValue:boolean) =>{
        setTasks([...tasks.map(m=>m.id === taskID ? {...m,isDone:newValue}:m)])
    }

    return (
        <div className="App">
            <Todolist
                name={"Todolist one"}
                // key={id}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}


