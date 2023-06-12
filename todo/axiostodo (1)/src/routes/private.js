import { useAuth } from "context/auth.ctx";
import TokenRepository from "repositories/TokenRepository";
const { useEffect } = require("react");
const {
  useNavigate,
  Outlet,
  Navigate,
  useLocation,
} = require("react-router-dom");

const PrivateRoute = () => {
  //이게 왜 안받아와 지는지 모르겠음.....???
  const { accessToken } = useAuth();
  console.log(accessToken); //null => 로그인 상태에도 null???
  // const accessToken = TokenRepository.getToken();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log("accessTokenaaa", accessToken);
  // 현재 페이지의 url의 path를 가지고오는 훅
  useEffect(() => {
    if (!accessToken) {
      //로그아웃
      navigate("/", {
        state: {
          from: pathname,
        },
        // navigation의 state 옵션을 활용하면
        // 쿼리 스트리잉나 파람으로 데이터를 보내지 않아도 원하는 데이터를 전송할 수 있다.
        // 따라서 굳이 사용자에게 노출시키지 않을 데이터라면 state로 보내도 괜찮다.
        // 그러나 대부분의 데이터는 사용자에게 보여주는 것이 좋습니다.
      });
    }
  }, [accessToken]);

  return accessToken ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;

// import { useAuth } from "context/auth.ctx";
// import { useEffect } from "react";
// import { useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";
// import TokenRepository from "repositories/TokenRepository";

// const PrivateRoute = () => {
//   const { accessToken, setAccessToken } = useAuth();
//   console.log("pivateRoute accessToken", accessToken);
//   useEffect(() => {
//     const token = TokenRepository.getToken();
//     if (token) {
//       setAccessToken(token);
//     }
//     console.log("auth.context", token);
//   }, []);

//   const navigate = useNavigate();

//   //이 privatROute가 실행될떄 어떤 주소에서 실행되었는지 알려줌
//   const { pathName } = useLocation();

//   return accessToken ? <Outlet /> : <Navigate to={"/"} />;
// };

// export default PrivateRoute;

//현재 페이지의 url의 path를 가지고 오는 hook

// useEffect(() => {
//   if (!accessToken) {
//     navigate("/", {
//       //naviage의 state 옵션을 쓰면 쿼리스트링이나 파람으로 데이터를보내지 않아도
//       //원하는 데이터를 보내줄 수 있다
//       //따라서 사용자에게 노출시키지 않을 데이터라면 state로 보내도 괜찮음.
//       //하지만 대부분의 데이터는 사용자에게 보여준는 것이 좋다.
//       state: {
//         from: pathName,
//       },
//     });
//   }
// }, []);

//accessToken이 있으면 outlet, 없으면 메인페이지로 이동함.
// return accessToken ? <Outlet /> : <Navigate to={"/"} />;
