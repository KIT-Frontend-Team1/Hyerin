import TodoApi from "apis/todo.api";

const { createContext, useState, useEffect, useContext } = require("react");

const TodoContenxt = createContext();
export const useTodo = () => useContext(TodoContenxt);

const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  const getTodoList = async () => {
    try {
      const res = await TodoApi.getTodo();
      setTodoList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // add , update, delete
  const addTodo = async (title, content) => {
    if (!title || !content) {
      const err = new Error();
      err.type = "empty error";
      err.message = "빈칸을 채워주세요";
      throw err;
    }
    await TodoApi.addTodo(content, title);
    getTodoList();
  };

  const updatTodo = async (id, content, state) => {
    await TodoApi.updatTodo(id, { content, state });
    getTodoList();
  };

  const deleteTodo = async (id) => {
    await TodoApi.deleteTodo(id);
    getTodoList();
  };
  // state, get, add, update, delete --> 전역으로 사용해서 어디서든 꺼내려는 것

  return (
    <TodoContenxt.Provider
      value={{ todoList, getTodoList, addTodo, updatTodo, deleteTodo }}
    >
      {children}
    </TodoContenxt.Provider>
  );
};
export default TodoProvider;
