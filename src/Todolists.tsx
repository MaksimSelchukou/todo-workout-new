import React from 'react';
import {fiteredType, tasksType} from "./App";
import {Button} from "./components/Button";

type TodolistType = {
    tasks: Array<tasksType>
    name: string
    removeTask: (taskID: string) => void
    changeFilter: (value: fiteredType) => void
    addTask:()=>void
}

export const Todolist = ({name, ...props}: TodolistType) => {


    const RemoveTaskHandler = (taskID: string) => {
        props.removeTask(taskID)
    }

    const onClickHandlerChangeFilter = (value: fiteredType) => {
        props.changeFilter(value)
    }

    const addTaskHandler = () => {
      props.addTask()
    }



    return (
        <div>
            <h3>
                {name}
                <Button name={"del"} callBack={() => {
                }}/>
            </h3>
            <div>
                <input/>
               {/*<button>+</button>*/}
                <Button name={"+"} callBack={()=>addTaskHandler()}/>
            </div>
            <ul>
                {
                    props.tasks.map(m =>
                        <li key={m.id}>
                            <input type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span>
                            <button onClick={() => RemoveTaskHandler(m.id)}>x</button>
                        </li>)
                }
            </ul>
            <div>
                <Button name={"ALL"} callBack={() => onClickHandlerChangeFilter("all")}/>
                <Button name={"ACTIVE"} callBack={() => onClickHandlerChangeFilter("active")}/>
                <Button name={"COMPLETED"} callBack={() => onClickHandlerChangeFilter("completed")}/>
            </div>
        </div>
    );
};

