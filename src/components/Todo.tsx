import React from 'react';
import { useState } from 'react';
// import { CreateTodo } from '../types/todo';



const Todo = () => {
    const [todoText,setTodoText]=useState<string>("")
    const [incompleteTodos,setIncompleteTodos]=useState<string[]>([])


    const onChangeTodoText = (event :React.ChangeEvent<HTMLInputElement>) => setTodoText(event.target.value);

    const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
    };

    return (
    <>
    <div>
    <input
        type='text'
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChangeTodoText}
    />
    <button onClick={onClickAdd}>追加</button>
    </div>

    <div>
        <p>未完了</p>
        <ul>
            <li>やること</li>
            <select name="incompleteSelect" id="">
                <option value="ongoing">進行中</option>
                <option value="waiting">未着手</option>
                <option value="complete">完了</option>
            </select>
            <button>削除</button>
        </ul>
    </div>

    <div>
        <p>完了</p>
        <ul>
            <li>やったこと</li>
            <button>戻す</button>
        </ul>
    </div>

    </>
    );
};

export default Todo; 