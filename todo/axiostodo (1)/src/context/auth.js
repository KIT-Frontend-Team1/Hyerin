// //auth.ctx.js로 이름지어도 됨
// //로그인 되었다는 상태를 전역으로 관리하기
// //내일부터 node.js시간 !! 쉽다. maybe
// import { createContext } from "react";
// import { useContext, useState } from "react";
// import TokenRepository from "repositories/TokenRepository";

// export const AuthContext = createContext();

// export const useAuthContext = () => useContext(AuthContext);

// // export const accessToken = localStorage.getItem("accessToken")
// //   ? localStorage.getItem("accessToken")
// //   : console.log("현재 토큰이 없습니다.");
// // console.log("현재토큰", accessToken);

// //false이면 로그인 상태가 아님
// //true이면 로그인 상태임
// export const AuthContextProvider = ({ children }) => {
//   //✅이렇게 만들면 처음 context가 만들어질때 뺴고는 바뀌지 않는다.
//   //초기값으로 설정했기 때문이다.
//   const [auth, setAuth] = useState(!!TokenRepository.getToken());

//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
