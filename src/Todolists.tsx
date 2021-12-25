import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {fiteredType, tasksType} from "./App";
import {Button} from "./components/Button";

type TodolistType = {
    tasks: Array<tasksType>
    name: string
    removeTask: (taskID: string) => void
    changeFilter: (value: fiteredType) => void
    addTask: (title: string) => void
    changeStatus:(taskID:string,newValue:boolean)=>void
}

export const Todolist = ({name, ...props}: TodolistType) => {


    const RemoveTaskHandler = (taskID: string) => {
        props.removeTask(taskID)
    }

    const onClickHandlerChangeFilter = (value: fiteredType) => {
        props.changeFilter(value)
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    let [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.addTask(title)
            setTitle('')
        }
    }

    const onChangeStatusHandler = (taskID:string,event:ChangeEvent<HTMLInputElement>) =>{
        let newIsDoneValue = event.currentTarget.checked
        props.changeStatus(taskID,newIsDoneValue)
    }


    return (
        <div>
            <h3>
                {name}
                <Button name={"del"} callBack={() => {
                }}/>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                {/*<button>+</button>*/}
                <Button name={"+"} callBack={addTaskHandler}/>
                {/*() => addTaskHandler(title)*/}
            </div>
            <ul>
                {
                    props.tasks.map(m => {
                        return <li key={m.id}>
                            <input
                                onChange={(e)=>onChangeStatusHandler(m.id,e)}
                                type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span>
                            <button onClick={() => RemoveTaskHandler(m.id)}>x</button>
                        </li>
                    })
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

