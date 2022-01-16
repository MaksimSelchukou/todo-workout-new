import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolists";
import {UniversalInput} from "./components/UniversalInput";

export type fiteredType = "all" | "active" | "completed"

type TodolistsType = {
    id: string
    title: string
    filter: fiteredType
}


export type tasksType = {
    id: string
    title: string
    isDone: boolean
}

type TaskStateType={
    [key:string]:Array<tasksType>
}

export function App() {


    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS", isDone: false},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    );

    const changeFilter = (value: fiteredType, TodoID: string) => {
        setTodolists(todolists.map(m => m.id === TodoID ? {...m, filter: value} : m))
        console.log(todolists.map(m => m.id === TodoID ? {...m, filter: value} : m))
        // setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m))
    }
    const removeTask = (taskID: string, TodoID: string) => {
        setTasks({...tasks, [TodoID]: tasks[TodoID].filter(f => f.id !== taskID)})
    }

    const addTask = (title: string,TodoID: string) => {
         let newTask = {id:v1(),title:title,isDone:false}
          setTasks({...tasks,[TodoID]: [newTask,...tasks[TodoID]]})
    }
    const changeStatusTask = (taskID: string, newValue: boolean, TodoID: string) => {
        setTasks({...tasks, [TodoID]: tasks[TodoID].map(m => m.id === taskID ? {...m, isDone: newValue} : m)})

    }

    const addTodolist = (title:string) => {
       let newTodolist:TodolistsType = {id:v1(),title:title,filter:"all"}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newTodolist.id]:[]})
    }

    const removeTodolist = (TodoId:string) =>{
        setTodolists(todolists.filter(f => f.id !== TodoId))
        // setTasks({...tasks,[TodoId]:tasks[TodoId].filter(f=>f.id !== TodoId)})
        delete tasks[TodoId]
    }

    return (
        <div className="App">
            <UniversalInput  addItem={addTodolist}/>
            {todolists.map(m => {

                let tasksForTodolist = tasks[m.id];
                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(f => !f.isDone)
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(f => f.isDone)
                }
                return (
                    <Todolist
                        name={m.title}
                        key={m.id}
                        id={m.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatusTask}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}


