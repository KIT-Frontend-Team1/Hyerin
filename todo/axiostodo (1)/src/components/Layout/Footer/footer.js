import AuthApi from "apis/class/auth.api";
import TokenRepository from "repositories/TokenRepository";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "context/auth";
const Footer = () => {
  const navigate = useNavigate();
  // const [auth, setAuth] = useAuthContext();

  const onLogout = () => {
    AuthApi.logout();
    TokenRepository.removeToken();
    console.log("logout token 확인", TokenRepository.getToken());
    navigate("/");
    // setAuth(false);
  };

  const onNavigateTodo = () => {
    if (TokenRepository.getToken()) {
      return navigate("/todo/3");
    }
    return navigate("/");
  };
  return (
    <>
      <div>FOOTER</div>
      <Button onClick={onLogout}>logout</Button>
      <Button onClick={onNavigateTodo}>todoPage</Button>
    </>
  );
};
export default Footer;

const Button = styled.button`
  width: 100px;
  height: 50px;
  font-size: 20px;
`;
