import OneTodo from "./one-todo";
import { useTodoContext } from "context/todo";
import TodoApi from "apis/class/todo.api";

const TodoList = () => {
  const { todoList } = useTodoContext();
  //✅수업코드 => 업데이트 로직
  //관심사 분리를 해야할 이유가 생김 => getTodo를 불러와야 하기 때문에.
  //try...catch는 한번만 크게 감싸주면 된다.

  //수정todo
  // const onUpdateTodo = async (id, content, state) => {
  //   try {
  //     await updateTodo(id, content, state);
  //     // const updateRes = await TodoApi.updateTodo(id, { content, state });
  //     // console.log("updateRes", updateRes);
  //     // //관심사 분리를 할만한 코드는 아님
  //     // //getTodo에 setTodoList가 들어가면..?
  //     // const getTodoRes = await TodoApi.getTodo();
  //     // console.log("getTodoRes", getTodoRes);
  //     // setTodoList(getTodoRes.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //삭제todo
  // const onDeleteTodo = async (id) => {
  //   try {
  //     await deleteTodo();
  //     // const deleteRes = await TodoApi.deleteTodo(id);
  //     // console.log("deleteRes", deleteRes);
  //     // const getTodoRes = await TodoApi.getTodo();
  //     // console.log("getTodoRes", getTodoRes);
  //     // setTodoList(getTodoRes.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //체크todo
  // const onCheckTodo = async (id, content, state) => {
  //   try {
  //     const checkTodo = await TodoApi.checkTodo(id, { content, state });
  //     console.log("checkTodo", checkTodo);
  //     const getTodoRes = await TodoApi.getTodo();
  //     console.log("getTodoRes", getTodoRes);
  //     setTodoList(getTodoRes.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // ui를 바꿔주는 방법
  // 1. 낙관적 업데이트 방법
  // 2. api를 다시 호출해서 업데이트 index => getApi();

  // 만약 요청이 실패하면 => 다시 getApi를 호출하면 됨 => todoList가 바뀜(백서버와 똑같이)

  return (
    <>
      {todoList.length > 0 &&
        todoList.map((todo) => <OneTodo key={todo.id} todo={todo} />)}
    </>
  );
};
export default TodoList;
