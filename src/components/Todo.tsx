import React from 'react';
import { useState } from 'react';
// import { CreateTodo } from '../types/todo';

// interface TodoItem {
//     text: string;
//     deadline: string; // YYYY-MM-DD形式
// }


const Todo = () => {
    const [todoText,setTodoText]=useState<string>("")
    const [todoDeadline,setTodoDeadline]=useState<string>("")
    const [incompleteTodos,setIncompleteTodos]=useState<string[]>([]) //日付の設定
    const [completeTodos, setCompleteTodos] = useState<string[]>([]);

    // 編集機能用の状態
    const [editIndex, setEditIndex] = useState<number | null>(null); // 編集中のindex
    const [editText, setEditText] = useState<string>(""); // 編集中のテキスト
    const [isComposing, setIsComposing] = useState(false); // 日本語変換と確定のEnterを区別する

    const onChangeTodoText = (event :React.ChangeEvent<HTMLInputElement>) => setTodoText(event.target.value);
    const onChangeTodoDeadline = (event: React.ChangeEvent<HTMLInputElement>) => setTodoDeadline(event.target.value);

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
        const newCompleteTodos = [...completeTodos];
        newCompleteTodos.splice(index, 1);

        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos(newCompleteTodos);
        
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

    // 戻るボタン
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

    // 編集ボタンを押した時
    const onClickEdit = (index: number) => {
        setEditIndex(index);                    // 編集中のindexを設定
        setEditText(incompleteTodos[index]);    // 現在のテキストを編集用stateに設定
    };

    // 編集中のテキストが変更された時
    const onChangeEditText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(event.target.value);
    };

    // エンターキーで編集確定
    const onKeyDownEdit = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Enter" && !isComposing) {
            const newIncompleteTodos = [...incompleteTodos];
            newIncompleteTodos[index] = editText;   // 編集内容を反映
            setIncompleteTodos(newIncompleteTodos);
            
            // 編集状態をリセット
            setEditIndex(null);
            setEditText("");
        }
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
    {/* 日付を選択 */}
    <input
        type="date" //日付をカレンダーで選択ができるようになる
        value={todoDeadline}
        onChange={onChangeTodoDeadline}
    />
    <button onClick={onClickAdd}>追加</button>
    </div>

    <div>
        <p>未完了</p>
        <p style={{ fontSize: "12px", color:"blue" }}>※ 編集を確定するときはEnterで決定</p>
        <ul>
            {incompleteTodos.map((todo,index)=>
                <li key={index}>
                    
                    {/* ↓ indexも一緒に渡すのでアロー関数で渡す必要がある */}
                    {/* ↓ 三項演算子で編集中ならinput、編集していないなら{todo}を表示 */}
                    {editIndex === index ? (
                        <input 
                        type="text"
                        // 編集中の内容をエンターで確定させる
                        value={editText}
                        onChange={onChangeEditText}
                        onKeyDown={(event)=> onKeyDownEdit(event,index)}
                        // 日本語の変換確定をさせる
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                        autoFocus
                        />
                    ) : (
                        <>
                        {todo}
                        </>
                    )}
                    <select onChange={(event) => onChangeSelect(index, event.target.value)} name="incompleteSelect" id="">
                        <option value="ongoing">進行中</option>
                        <option value="waiting">未着手</option>
                        <option value="complete">完了</option>
                    </select>
                <button onClick={()=>onClickEdit(index)}>編集</button>
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