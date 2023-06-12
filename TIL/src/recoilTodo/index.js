import { useRecoilValue, useRecoilState } from "recoil";
import todoListState from "./atoms/todoState";
import TodoItem from "./componenets/todoItem";
import { useState } from "react";

const TodoList = () => {
  //   const todoList = useRecoilValue(todoListState);
  const [addText, setAddText] = useState("");
  //값만 읽을떄는 useRecoilValue, 상태까지 바꿀 때는 useRecoilState
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onAddItem = (e) => {
    e.preventDefault();
    console.log(addText);
    setTodoList(addItem(todoList, addText));
    setAddText("");
  };

  const onChangeText = ({ target: { value } }) => {
    setAddText(value);
  };

  return (
    <form onSubmit={onAddItem}>
      <input onChange={onChangeText} value={addText} />
      <button>추가</button>
      {todoList.map((todoItem) => {
        return <TodoItem key={Math.random()} item={todoItem} />;
      })}
    </form>
  );
};
export default TodoList;

const addItem = (arr, text) => {
  const newArr = [...arr, { id: Math.random(), text, isCompleted: false }];
  return newArr;
};
