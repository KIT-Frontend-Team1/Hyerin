import { createContext } from "react";
import { useContext, useState } from "react";
import TodoApi from "apis/class/todo.api";

export const TodoContext = createContext();
export const useTodoContext = () => useContext(TodoContext);

//이런게 관심사 분리 => todoList에 관련된 로직을 이쪽으로 뺀것이다.
//view와 ui를 분리하는 방법이나, 재사용이되지 않는데 이렇게 항상하는것이 옳지는 않다!
//전역상태를 만든다는 것은 단순히 상태를 만들고 끝이 아니다.
//그 상태를 수정하는 모든 함수들도 정의할 수 있다

//이렇게 하면 함수를 props drilling하는 것도 막을 수 있다.
export const TodoContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  //state, get, add, update, delete => 전역으로 사용해서 어디서든 꺼내려는 것

  const getTodoList = async () => {
    const res = await TodoApi.getTodo();
    setTodoList(res.data.data);
  };

  // useEffect(() => {
  //   getTodoList();
  // }, []);

  const updateTodo = async (id, content, state) => {
    try {
      const updateRes = await TodoApi.updateTodo(id, { content, state });
      console.log("updateRes", updateRes);
      //관심사 분리를 할만한 코드는 아님
      //getTodo에 setTodoList가 들어가면..?
      getTodoList();
    } catch (err) {
      console.log(err);
    }
  };

  //삭제todo
  const deleteTodo = async (id) => {
    try {
      const deleteRes = await TodoApi.deleteTodo(id);
      console.log("deleteRes", deleteRes);
      getTodoList();
    } catch (err) {
      console.log(err);
    }
  };

  //체크todo
  const checkTodo = async (id, content, state) => {
    try {
      const checkTodo = await TodoApi.checkTodo(id, { content, state });
      console.log("checkTodo", checkTodo);
      getTodoList();
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (title, content) => {
    if (!title || !content) {
      throw new Error("빈칸을 채워주세요");
    }
    const res = await TodoApi.addTodo(title, content);
    console.log("addTodo res", res);
    setTodoList([...todoList, res.data.data]);
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        getTodoList,
        addTodo,
        updateTodo,
        deleteTodo,
        checkTodo,
        setTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
