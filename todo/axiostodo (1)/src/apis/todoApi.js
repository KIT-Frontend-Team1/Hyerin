import { axiosInstance } from "./class/@core";
import { useTodoContext } from "context/todo";

//@연습용 코드
//쓰지 않음 => class의 todo.api.js 코드를 대신 씀
const Apis = () => {
  const { todoList, setTodoList } = useTodoContext();

  //todo 가져오는 api
  const getApi = async () => {
    let res;
    try {
      res = await axiosInstance.get("/todo");
      console.log("get 결과", res);
      setTodoList(res.data.data);
    } catch (err) {
      console.log("get 에러", err);
    }
  };

  //추가 api
  const addApi = async (title, content) => {
    try {
      await axiosInstance.post("/todo", {
        title,
        content,
      });
      console.log("todoList", todoList);
      getApi();
    } catch (err) {
      console.log("추가에러", err);
    }
  };

  const updateApi = async (id, content, state) => {
    try {
      const res = await axiosInstance.put(`todo/${id}`, { content, state });
      console.log("업데이트 결과", res);
      getApi();
    } catch (err) {
      console.log("업데이트 에러", err);
    }
  };

  const deleteApi = async (id) => {
    try {
      const res = await axiosInstance.delete(`todo/${id}`);
      console.log("삭제 결과", res);
      getApi();
    } catch (err) {
      console.log("삭제 에러", err);
    }
  };

  const checkApi = async (id, content, state) => {
    console.log("checkstate", state);
    try {
      const res = await axiosInstance.put(`todo/${id}`, {
        content,
        state: !state,
      });
      console.log("체크 결과", res);
      getApi();
    } catch (err) {
      console.log("체크 에러", err);
    }
  };

  const TodoApis = {
    getApi,
    addApi,
    updateApi,
    deleteApi,
    checkApi,
  };

  return TodoApis;
};

export default Apis;
