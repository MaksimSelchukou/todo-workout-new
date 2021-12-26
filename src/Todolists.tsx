import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {fiteredType, tasksType} from "./App";
import {Button} from "./components/Button";

type TodolistType = {
    tasks: Array<tasksType>
    name: string
    removeTask: (taskID: string,TodoID:string) => void
    changeFilter: (value: fiteredType,id:string) => void
    addTask: (title: string,TodoID: string) => void
    changeStatus: (taskID: string, newValue: boolean,TodoID:string) => void
    id: string
}

export const Todolist = ({name, ...props}: TodolistType) => {


    let [title, setTitle] = useState('')

    const RemoveTaskHandler = (taskID: string) => {
        props.removeTask(taskID,props.id)
    }
    const onClickHandlerChangeFilter = (value: fiteredType) => {
        props.changeFilter(value,props.id)
    }
    const addTaskHandler = () => {
        props.addTask(title,props.id)
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.addTask(title,props.id)
            setTitle('')
        }
    }
    const onChangeStatusHandler = (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeStatus(taskID, newIsDoneValue,props.id)
    }


    return (
        <div>
            <h3>
                {name}
                <Button name={"del"} callBack={() => {}}/>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <Button name={"+"} callBack={addTaskHandler}/>
            </div>
            <ul>
                {
                    props.tasks.map(m => {
                        return <li key={m.id}>
                            <input
                                onChange={(e) => onChangeStatusHandler(m.id, e)}
                                type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span>
                            {/*<button onClick={() => RemoveTaskHandler(m.id)}>x</button>*/}
                            <Button name={"x"} callBack={() => RemoveTaskHandler(m.id)}/>
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

