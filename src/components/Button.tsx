import React from 'react';

type ButtonType={
    name:string
    callBack:()=>void
}

export const Button = ({name,...props}:ButtonType) => {

    const onClickHandler = () =>{
        props.callBack()
    }

    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};

