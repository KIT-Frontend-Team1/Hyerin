import { axiosInstance } from "./@core";
const PATH = "/todo";

//객체의 메소드 형식으로 만들어주기
//이렇게 하면 자동완성과 재사용될 수 있어서 편리하다.
const TodoApi = {
  getTodo() {
    return axiosInstance.get(PATH);
  },
  addTodo(title, content) {
    return axiosInstance.post(PATH, {
      title,
      content,
    });
  },
  updateTodo(id, { content, state }) {
    return axiosInstance.put(PATH + `/${id}`, {
      content,
      state,
    });
  },
  deleteTodo(id) {
    return axiosInstance.delete(PATH + `/${id}`);
  },
  checkTodo(id, { content, state }) {
    return axiosInstance.put(PATH + `/${id}`, {
      content,
      state: !state,
    });
  },
};

export default TodoApi;

//try...catch를 넣지 않는 것이 좋다.
//나중에 이 api를 사용할때 try...catch를 사용하는 것이 좋다.
