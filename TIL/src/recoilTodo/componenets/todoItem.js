import { useRecoilState } from "recoil";
import todoListState from "../atoms/todoState";
import { useState } from "react";
import styled from "styled-components";

const TodoItem = ({ item }) => {
  const { id, isCompleted } = item;
  console.log(item);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isEdit, setIsEdit] = useState(false);
  const [inputText, setInputText] = useState("");
  //{e.target.value구조분해할당}
  //arr로 todoList를 넣으면 밑의 로직을 재사용할 수 있다.
  const editItemText = ({ target: { value } }) => {
    setInputText(value);
  };

  const onSubmit = () => {
    const newList = replaceItemAtIndex(todoList, id, {
      ...item,
      text: inputText,
    });
    setTodoList(newList);
    setInputText("");
    setIsEdit(false);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, id);
    setTodoList(newList);
  };

  const onClickEditMode = () => {
    setIsEdit((prev) => !prev);
  };

  const completeItem = () => {
    console.log(isCompleted);
    setTodoList(checkItem(todoList, id, isCompleted));
  };

  return (
    <>
      <Text isCompleted={isCompleted}>{item.text}</Text>
      {isEdit ? (
        <>
          <input type="text" onChange={editItemText} value={inputText} />
          <button onClick={onSubmit}>완료</button>
        </>
      ) : (
        <button onClick={onClickEditMode}>수정</button>
      )}
      <button type="button" onClick={deleteItem}>
        삭제
      </button>
      <button type="button" onClick={completeItem}>
        체크
      </button>
    </>
  );
};

export default TodoItem;

const replaceItemAtIndex = (arr, id, newValue) => {
  const newArr = [...arr];
  const targetIndex = newArr.findIndex((item) => item.id === id);
  newArr[targetIndex] = newValue;
  return newArr;
};

const removeItemAtIndex = (arr, id) => {
  const newArr = [...arr];
  return newArr.filter((item) => item.id !== id);
};

const checkItem = (arr, id, isCompleted) => {
  const newCompleted = !isCompleted;
  return arr.map((item) => {
    if (item.id === id) {
      return { ...item, isCompleted: newCompleted };
    }
    return item;
  });
};

const Text = styled.div`
  color: ${(props) => (props.isCompleted ? "#999" : "black")};
`;
