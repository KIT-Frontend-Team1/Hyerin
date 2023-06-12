import { useAuth } from "context/auth.ctx";
import styled from "styled-components";
import { axiosInstance } from "utils/axios";
import AuthApi from "apis/class/auth.api";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { accessToken, logout } = useAuth();

  //리프레시 버튼
  const onPressRefrshBtn = async () => {
    const res = await axiosInstance.post("/user/jwt");
    console.log(res);
  };

  const onPressLogOutBtn = async () => {
    await logout();
  };

  return (
    <div>
      HEADER
      <Button onClick={onPressRefrshBtn}>리프레시</Button>
      <Button onClick={onPressLogOutBtn}>
        {accessToken ? "로그아웃" : "로그인"}
      </Button>
    </div>
  );
};
export default Header;
// const Header = () => {
//   const { accessToken, logout } = useAuth();
//   const navigate = useNavigate();

//   const onPressRefreshBtn = async () => {
//     const res = await axiosInstance.post("/user/jwt");
//     console.log(res);
//   };

//   const onPressLogoutBtn = async () => {
//     //accessToken이 없으면 => 로그아웃 상태이면
//     if (!accessToken) return navigate("/");
//     //accessToken이 있으면 => 로그인 상태이면
//     const res = await AuthApi.logout();
//     //제대로 로그아웃이 이루어지면

//     //디버깅 : 200번이라고 했는데, res는 201을 성공으로 보내서 이루어지지 않음
//     //res를 console로 찍어 디버깅하면 가능.
//     console.log("aaaa", res);
//     //이렇게 메인페이지로 이동시키는 것 자체도 전역상태로 관리하는 것이다.
//     //매번 navigate로직을 작성하지 않아도 된다.
//     if (res.status === 201) {
//       logout();
//       navigate("/");
//     }
//   };

//   return (
//     <div>
//       HEADER
//       <Button onClick={onPressRefreshBtn}>refresh</Button>
//       <Button onClick={onPressLogoutBtn}>
//         {accessToken ? "로그아웃" : "로그인"}
//       </Button>
//     </div>
//   );
// };
// export default Header;

const Button = styled.button`
  width: 100px;
  height: 50px;
  font-size: 20px;
`;
