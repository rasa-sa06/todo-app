import React from 'react';
import { useState } from 'react';
// import { CreateTodo } from '../types/todo';



const Todo = () => {
    const [todoText,setTodoText]=useState<string>("")
    const [incompleteTodos,setIncompleteTodos]=useState<string[]>([])
    const [completeTodos, setCompleteTodos] = useState<string[]>([]);


    const onChangeTodoText = (event :React.ChangeEvent<HTMLInputElement>) => setTodoText(event.target.value);

    // 追加ボタンを押した後に未完了のエリアに新しい配列を作る
    const onClickAdd = () => {
        if (todoText === "") return;
        const newTodos = [...incompleteTodos, todoText];
        setIncompleteTodos(newTodos);
        setTodoText("");
    };

    // 削除ボタンを押したら消す
    const onClickDelete = (index: number) => {
        const newIncompleteTodos = [...incompleteTodos];
        newIncompleteTodos.splice(index, 1);
        const newConmpleteTodos = [...completeTodos];
        newConmpleteTodos.splice(index, 1);

        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos(newConmpleteTodos);
        
    };

    // 完了が選ばれたときに完了エリアにリストを移す（完了エリアで新しい配列を作る）
    const onChangeSelect = (index: number, value: string) => {
        if (value=== "complete"){
            // 未完了のエリアから削除
            const newIncompleteTodos = [...incompleteTodos];
            newIncompleteTodos.splice(index,1);
            // 完了エリアに新しい配列を作る
            const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

            // ステートの更新
            setIncompleteTodos(newIncompleteTodos);
            setCompleteTodos(newCompleteTodos);
        }
    }

    const onClickBack = (index: number) => {
        // 完了エリアに新しい配列を作る
        const newCompleteTodos = [...completeTodos];
        newCompleteTodos.splice(index,1);
        // 未完了のエリアに完了エリアから移動させて新しい配列を作る
        const newIncompleteTodos =[...incompleteTodos,completeTodos[index]];

        // ステートを更新
        setCompleteTodos(newCompleteTodos);
        setIncompleteTodos(newIncompleteTodos);
    }

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
            {incompleteTodos.map((todo,index)=>
                <li key={index}>
                    {todo}
                    {/* ↓ indexも一緒に渡すのでアロー関数で渡す必要がある */}
                    <select onChange={(event) => onChangeSelect(index, event.target.value)} name="incompleteSelect" id="">
                        <option value="ongoing">進行中</option>
                        <option value="waiting">未着手</option>
                        <option value="complete">完了</option>
                    </select>
                <button onClick={()=>onClickDelete(index)}>削除</button>
                </li>
            )}
        </ul>
    </div>

    <div>
        <p>完了</p>
        <ul>
            {completeTodos.map((todo,index)=>
            <li key={index}>
                {todo}
                <button onClick={()=>onClickBack(index)}>戻す</button>
                <button onClick={()=>onClickDelete(index)}>削除</button>
            </li>
            )}
        </ul>
    </div>

    </>
    );
};

export default Todo; 