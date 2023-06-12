import styled from "styled-components";
import {
  flexAlignCenter,
  flexCenter,
  modalBackGround,
} from "../../../../styles/common";
import { useTodoContext } from "context/todo";
import { toast } from "react-toastify";

const TodoAddModal = ({ onClose }) => {
  const { addTodo } = useTodoContext();
  const showTodoToastMessage = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    toast
      .promise(addTodo(title, content), {
        pending: "TODO LOADING",
        success: "TODO SUCEESS",
        error: "TODO ERROR",
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        if (err.type === "empty error") {
          alert(err.message);
        }
      });
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={showTodoToastMessage}>
        <S.Title>
          <span>ADD TODO LIST</span>
          <button type="button" onClick={onClose}>
            x
          </button>
        </S.Title>
        <S.Content>
          <input placeholder="제목을 입력해주세요" name="title" />
          <textarea
            placeholder="할 일 내용을 입력해주세요"
            name="content"
          ></textarea>
        </S.Content>
        <S.Button>ADD</S.Button>
      </S.Form>
    </S.Wrapper>
  );
};
export default TodoAddModal;

// onAddToDo={showTodoToastMessage}
// handleCloseTodoModal={handleCloseTodoModal}
// setIsAddTodoModal={setIsAddTodoModal}
// const TodoAddModal = ({ onAddTodo, handleCloseTodoModal }) => {
// const onAddTodo = async (title, content) => {
//   if (!title || !content) {
//     throw new Error("빈칸을 채워주세요");
//   }
//   try {
//     await addTodo();
//     // const res = await TodoApi.addTodo(title, content);
//     // console.log("addTodo res", res);
//     // setTodoList([...todoList, res.data.data]);
//   } catch (err) {
//     console.error(err);
//     //상위 코드에서 에러를 처리하게 함. 여기서는 showTodoToastMessage
//     //가 에러를 처리함.
//     throw err;
//   }
// };

// const showTodoToastMessage = (e) => {
//   e.preventDefault();
//   const title = e.target.title.value;
//   const content = e.target.content.value;
//   toast
//     .promise(onAddTodo(title, content), {
//       pending: "TODO LOADING",
//       success: "TODO SUCEESS",
//       error: "TODO ERROR",
//     })
//     .then(() => setIsAddTodoModal(false))
//     .catch((err) => {
//       if (err.type === "empty error") {
//         alert(err.message);
//       }
//     });
// };

// const toastOption = {
//   autoClose: 2000,
//   theme: "colored",
// };

// const handAddTodoModal = () => {
//   setIsAddTodoModal(true);
// };

// const handleCloseTodoModal = () => {
//   setIsAddTodoModal(false);
// };

//   return (
//     <S.Wrapper>
//       <S.Form
//         onSubmit={() => {
//           onAddTodo();
//         }}
//       >
//         <S.Title>
//           <span>ADD TODO LIST</span>
//           <button type="button" onClick={handleCloseTodoModal}>
//             x
//           </button>
//         </S.Title>
//         <S.Content>
//           <input placeholder="제목을 입력해주세요" name="title" />
//           <textarea
//             placeholder="할 일 내용을 입력해주세요"
//             name="content"
//           ></textarea>
//         </S.Content>
//         <S.Button>ADD</S.Button>
//       </S.Form>
//     </S.Wrapper>
//   );
// };
// export default TodoAddModal;

const Wrapper = styled.div`
  ${modalBackGround};
  z-index: 1000;
`;

const Form = styled.form`
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 32px;
`;

const Title = styled.div`
  font-size: 24px;
  ${flexAlignCenter};
  justify-content: space-between;

  & > button {
    border: none;
    cursor: pointer;

    :hover {
      transform: scale(1.2);
    }
  }
`;

const Content = styled.div`
  ${flexCenter};
  margin-top: 16px;
  flex-direction: column;

  & > input {
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 0 16px;
    margin-bottom: 16px;
  }

  & > textarea {
    width: 100%;
    height: 200px;
    border: none;
    outline: none;
    border-radius: 8px;
    padding: 16px;
  }
`;

const Button = styled.button`
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
  color: ${({ theme }) => theme.PALETTE.fontColor};
  margin: 0 auto;
  cursor: pointer;
  :hover {
    background-color: transparent;
    color: ${({ theme }) => theme.PALETTE.primary[300]};
  }
`;

const S = {
  Wrapper,
  Form,
  Content,
  Title,
  Button,
};
