import { createContext, useReducer, useContext } from "react";

//초기 state 정의
const initialState = [{ id: 1, name: "홍길동", nickName: "히히" }];

//userReducer 정의 (reducer 함수)
const userReducer = (initialState, action) => {
  switch (action.type) {
    case "ADD":
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: action.name,
        nickName: action.nickName,
      };
      return [...initialState, newUser];

    case "ADDSTATUS":
      return initialState.map((user) => ({ ...user, isEdit: true }));

    case "RESET":
      return [];

    case "SUBMIT":
      console.log("버튼 눌림");
      initialState
        .filter((user) => user.isEdit === true)
        .forEach((data) => console.log(data));
      return initialState;
    default:
      return initialState;
  }
};

//전역상태 객체 생성
const UserContext = createContext();

//isEdit state 정의
// const isEdit = () => {
//   return userList.filter((list) => list.isEdit === true);
// };

//Context.provider : 생성한 context 객체를 하위 컴포넌트에 전달하는 역할
//context를 전달할 때 일반 state가 아닌 reducer 함수를 value로 전달함.
const UserContextProvider = ({ children }) => {
  const [userList, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[userList, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

//useContext. context의 변화를 감시함
//설정한 상태를 불러올 때 사용함.
//provider에 의해 이 useUserContext에서 userList와 dispatch를 꺼내 사용할 수 있다.
//이거 사실 useContext(userContext)로 써서 import 해도 되는데 편리성을 위해 줄인거임.
export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
