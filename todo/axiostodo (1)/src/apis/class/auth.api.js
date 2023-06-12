import { axiosInstance } from "./@core";
//url 상수관리 => 이렇게 관리하면 하나씩 수정 할필요가 없다.
//오타 걱정할 필요도 없다.

const PATH = "/user";
const AuthApi = {
  login(email, password) {
    return axiosInstance.post(PATH + "/login", { email, password });
  },
  signUp(email, password) {
    return axiosInstance.post(PATH + "/sign", { email, password });
  },
  logout() {
    return axiosInstance.post(PATH + "/logout");
  },
};

export default AuthApi;

//api를 객체로 정의해서 뽑아쓰면 된다.
