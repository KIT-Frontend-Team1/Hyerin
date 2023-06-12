import React, { useEffect, useState } from "react";
import BasicButton from "../../components/Button/Button";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../styles/common";
import TodoAddModal from "./componetns/Modal/add-modal";
import TodoList from "./componetns/List/todo-list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useTodoContext } from "context/todo";

const TodoPage = () => {
  const params = useParams();

  const [isAddTodoModal, setIsAddTodoModal] = useState(false);
  const { getTodoList } = useTodoContext();

  useEffect(() => {
    getTodoList();
    /* 
          context provider의 useEffect의 실행 시기는
          provider를 호출한 컴포넌트가 랜더 되었을 때 (app.js에서 써주면 app.js)
          따라서 context 내부에 effect를 호출하면 getTodoList에는 access_token이 없어서 불러올 수 없음
      */
  }, [getTodoList]);

  const toastOption = {
    autoClose: 2000,
    theme: "colored",
  };

  const handAddTodoModal = () => {
    setIsAddTodoModal(true);
  };

  const handleCloseTodoModal = () => {
    setIsAddTodoModal(false);
  };

  return (
    <>
      {isAddTodoModal && <TodoAddModal onClose={handleCloseTodoModal} />}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <S.Content>
            <TodoList />
          </S.Content>
          <S.ButtonBox>
            <BasicButton
              variant={"primary"}
              size={"full"}
              onClick={handAddTodoModal}
            >
              추가
            </BasicButton>
          </S.ButtonBox>
        </S.Container>
      </S.Wrapper>
      <ToastContainer {...toastOption} />
    </>
  );
};
export default TodoPage;
const Wrapper = styled.div`
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
  color: ${({ theme }) => theme.PALETTE.fontColor};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const S = {
  Wrapper,
  Container,
  Title,
  ButtonBox,
  Content,
};

// const TodoPage = () => {
//   const [isAddTodoModal, setIsAddTodoModal] = useState(false);
//   const { todoList, setTodoList, addTodo } = useTodoContext();

//   //받아오는 api
//   //getTodo는 get하는 api만 있기 때문에
//   //try...catch로 감싸 주어야 함
//   // const [auth, setAuth] = useAuthContext();
//   // console.log("TodoPage auth", auth);

//   // console.log("TodoPage auth", auth);

//   const { accessToken } = useAuth();

//   const ongetTodo = async () => {
//     const res = await TodoApi.getTodo();
//     // console.log("getTodo res", res.data.data);
//     setTodoList(res.data.data);
//   };

//   //렌더링시 getTodo실행
//   useEffect(() => {
//     ongetTodo();
//   }, []);

//   //추가함수
//   //useCrud =>
//   const onAddTodo = async (title, content) => {
//     try {
//       if (!title || !content) {
//         throw new Error("빈칸을 채워주세요");
//       }

//       addTodo();
//       // const res = await TodoApi.addTodo(title, content);
//       // console.log("addTodo res", res);
//       // setTodoList([...todoList, res.data.data]);
//     } catch (err) {
//       console.error(err);
//       //상위 코드에서 에러를 처리하게 함. 여기서는 showTodoToastMessage
//       //가 에러를 처리함.
//       throw err;
//     }
//   };

//   const showTodoToastMessage = (e) => {
//     e.preventDefault();
//     const title = e.target.title.value;
//     const content = e.target.content.value;
//     toast
//       .promise(onAddTodo(title, content), {
//         pending: "TODO LOADING",
//         success: "TODO SUCEESS",
//         error: "TODO ERROR",
//       })
//       .then(() => setIsAddTodoModal(false))
//       .catch((err) => {
//         if (err.type === "empty error") {
//           alert(err.message);
//         }
//       });
//   };

//   const toastOption = {
//     autoClose: 2000,
//     theme: "colored",
//   };

//   const handAddTodoModal = () => {
//     setIsAddTodoModal(true);
//   };

//   const handleCloseTodoModal = () => {
//     setIsAddTodoModal(false);
//   };
