//@연습용 코드
//쓰지 않음 => class의 auth.api.js 코드를 대신 씀

import { axiosInstance } from "./class/@core";

const signInApi = async (email, password) => {
  // const navigate = useNavigate;

  console.log("signInApi 시작");
  try {
    const res = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    console.log("signInApi", res);
    localStorage.setItem("accessToken", res.data.data.token);
    // navigate("/todo/1");
  } catch (err) {
    console.log(err);
  }
};

const signUpApi = async (email, password) => {
  try {
    //await을 써야 제대로된 res값이 나온다.
    //이걸안쓰면 promise가 나온다.
    const res = await axiosInstance.post("user/sign", { email, password });
    console.log("signUP api", res);
    console.log("축하합니다. 회원가입이 완료되셨습니다!");
  } catch (err) {
    console.log(err);
  }
};

const MainApis = {
  signInApi,
  signUpApi,
};
export default MainApis;
