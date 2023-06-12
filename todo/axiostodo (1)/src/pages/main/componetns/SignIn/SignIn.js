import { useNavigate } from "react-router-dom";

import * as S from "../style";
import BasicButton from "components/Button/Button";
import AuthApi from "apis/class/auth.api";
import { useAuth } from "context/auth.ctx";

const SignInForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const onPressSignIn = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value, e.target.password.value);
    const email = e.target.email.value;
    const password = e.target.password.value;

    //로그인 로직 api
    //수업코드
    try {
      const res = await AuthApi.login(email, password);
      //✅수정한 코드 setToken 할필요 없이 auth라는 전역상태에 login을 통해 token을 직접 넣어 관리한다.
      auth.login(res.data.data.token);
      // TokenRepository.setToken(res.data.data.token);
      navigate("/todo/3");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Form onSubmit={onPressSignIn}>
      <S.InputBox>
        <label>이메일</label>
        <input name="email" />
      </S.InputBox>
      <S.InputBox>
        <label>비밀번호</label>
        <input name="password" />
      </S.InputBox>
      <BasicButton size={"full"} shape={"default"} variant={"primary"}>
        로그인
      </BasicButton>
    </S.Form>
  );
};
export default SignInForm;

// try{
//     const res = await axios.post('http://localhost:9000/user/login', {email, password}, {
//         withCredentials: true
//     })
//     localStorage.setItem('accessToken', res.data.data.token)
// } catch (err) {
//     console.log(err)
// }

// if(email === "test" && password === "testtest"){
//     return navigation('/todo/1', {
//        state: {
//         email,
//         password
//        }
//     })
// }
// return alert("아이디와 비밀번호를 확인해주세요")
