import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type UniversalInputType = {

    addItem: (title: string) => void
}


export const UniversalInput = (props: UniversalInputType) => {
    let [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter")
            if (title.trim() !== "") {
                props.addItem(title)
                setTitle('')
            }
    }

    const addTaskHandler = () => {
        props.addItem(title)
        setTitle('')
    }


    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <Button name={"+"} callBack={addTaskHandler}/>
        </div>
    );
};

