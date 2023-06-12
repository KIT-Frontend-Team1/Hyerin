import axios from "axios";
import AuthApi from "./auth.api";
import TokenRepository from "repositories/TokenRepository";

// //core를 가장 앞에 위치시키면 _ 나 @를 앞에다가 넣음.
// //util안에 있는 axios 내용을 여기다가 넣음
// //axios의 가장 기본이 되는 내용이 들어감.

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    //이렇게 TokenRepository안에 있는 메소드를 사용함.
    //token key를 전달하지 않아도 됨.
    Authorization: `Bearer ${TokenRepository.getToken()}`,
  },
  withCredentials: true,
});

// //백엔드에 request 보내기 전에 이 로직 실행시켜줘~~~
// //accessToken을 실어서 보내준다는 의미
// 프론트엔드가 백엔드에 요청을 보내기 전에 가로채는 것, 주로 access_token
axiosInstance.interceptors.request.use((config) => {
  const access_token = TokenRepository.getToken();
  console.log(TokenRepository.getToken());
  console.log("access-token", access_token);
  // 토큰 불러온 것
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    // 헤더에 토큰을 실은 것
  }
  return config;
  // 다시 요청 그대로 전송
});

// 프론트엔드가 응답을 받기 전에 응답을 가로채는 것, 주로 refresh
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
    // 성공했을 때 가로챘을 때 로직이 있다면 구현
  },
  //응답이 error일때 쓸 로직
  //401에러일떄는 로그아웃을 시켜주고 만료된 token을 없애준다.
  //로그아웃을 쓰는 이유 => 레디스?, 로그아웃 기록, 중복 로그인을 관리하거나, 세션으로 관리중일떄, refresh 토큰을 없앤다 ...
  //를 위해서 로그아웃 상태를 백엔드에 무조건 알려주어야 한다!!!!
  //(백엔드한테 로그아웃 상태를 알려줘야 할 이유는 차고 넘치기 때문에...... )
  async (err) => {
    if (err.response.status === 401) {
      await AuthApi.logout();
      TokenRepository.removeToken();
    }
    //한번 재요청했는지 알려주는 변수
    //이게 true이면 이미 한번 실행했다는 뜻이므로 재요청을 보내지 않는다.
    //err.config는 요청의 속성이 들어있는 객체임.
    const originalRequest = err.config;
    //retry가 false일때만 실행됨. true 이면 실행되지 않음
    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      //강사님이 구현해놓은 jwt토큰 발급 로직
      //새로운 토큰을 받아 리턴함
      const res = await axiosInstance.post("/user/jwt");
      // 토큰 재발급 요청
      if (res.status === 200) {
        //성공
        const token = res.data.data;
        // 응답 데이터 -> 토큰
        TokenRepository.setToken(token);
        // 토큰 웹 스토리지 재설정
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Baerer ${token}`;
        // 헤더에 토큰 재설정
        return axiosInstance(originalRequest);
        // 기존 요청 재전송
      }
    }
  }
);

// // 리프레쉬 토큰 로직
// // accessToken을 보내지 않는 axiosInstance는 어떤 형태일까..? 윙?
// // acceessToeken이 만료되었다면 ?
// // 무조건 refeshToken x
// // 로그아웃 로직을 실행할 수도 있지만
// // 중간에 에러 상태(accessToken)이 만료되었다는 에러를 인터셉트하여 refreshToken을
// // 발급받도록 구현하면 됨 => sns 로그인등에 구현
