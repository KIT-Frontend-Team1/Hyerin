1. private에서 accessToken이 없다고 나옴
   => 로그인 상태에서도 todo 페이지로 이동이 안됨
2. 추가 기능이 구현이 안됨.
3. 토스트 메세지 로직을 index.js에서 addModal 로직으로 뼤는데 실패함

로그인되지 않은 사용자가 (accessToken이 없는 사용자) todoPage에 접근한 경우 이를 해결하는 방법
=> todoPage가 렌더링 될떄 useEffect에 navigate로 mainPage로 돌려보낸다.
=> 상태에 따라 특정 url로 접근하는 방법을 막는법???
(버튼이 없더라도 얼마든지 특정 페이지로 접근할 수 있다.)

graph QL => rest 보다 유행하는 백엔드 서버 api

회원가입 => POST
유저정보조회 => GET
유저삭제 => DELETE
같은 주소더라도 메소드(get, delete, post, patch...)에 따라 달라짐

시크릿 모드로 구글링하는게 매너

낙관적 업데이트 (addTodo )
(1)다른 유저가 추가한걸 실시간으로 볼수 없음
(2)edge case
=> 보통 좋아요기능 => 이럴때
=> 채팅(보낸다음에 보낸것처럼 보이게 하는법)
사용자에게 결과를 빠르게 보여줘야 할때 쓴다!

=> 사용자 경험이 데이터보다 우선시 되어야 할때

---

////home work//////

1.  (1)todo custom hook화 시켜서 =>
    todo 관심사 분리 (props drilling 해결하려면 전역 상태관리 도입해도 된다, context 사용, redux 사용,,,해도 됨)
    (2)accessToken 관심사 분리
    (3)api call에 대한 관심사 분리
2.  delete, update
    delete => axios.delete('/todo/3)
    update => axios.put('todo/3', {content, state}) => 무조건 이 형태로 보내야함

관심사 분리 (soc => 의존성 주입 방법 중 하나)

---

1.api 분리 => url 까먹음..? 2. 인증토큰 => 웹스토리지 3. todolist를 전역상태관리 => thunk로 바꾸기

2. auth 인증로직을 관심사 분리 => token으로 가져온 데이터는 렌더링을 하지 않는다.
   로그아웃하면 페이지 이동이 되어야만 ui가 바뀐다.

=> 로그인되었다는 사실(auth)를 state로 관리해야 한다.
