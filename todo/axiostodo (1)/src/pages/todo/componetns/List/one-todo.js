import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../../../styles/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useInput from "../../../../hooks/use-input";
import TimeForToday from "utils/time-helper";
import { useTodoContext } from "context/todo";

const OneTodo = ({ todo }) => {
  const { id, state, title, content, createdAt } = todo;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, onChangeEditContent] = useInput(content);
  const { updateTodo, deleteTodo, checkTodo } = useTodoContext();

  const handleTodoEdit = () => {
    if (!isEditMode) return setIsEditMode(true);
    updateTodo(id, editContent, state);
    setIsEditMode(false);
  };

  //삭제함수
  const onDeleteTodo = () => {
    if (window.confirm("진짜 삭제하시겠습니까?")) {
      return deleteTodo(id);
    }
  };

  //체크함수
  const onCheckTodo = () => {
    return checkTodo(id, content, state);
  };

  return (
    <S.Wrapper state={state}>
      <S.Header>
        <S.StateBox state={state}>
          <FontAwesomeIcon icon={faCheck} onClick={onCheckTodo} />
        </S.StateBox>
        <S.Title state={state}>
          {title}
          <div>
            {TimeForToday(createdAt)}
            <FontAwesomeIcon icon={faPen} onClick={handleTodoEdit} />
            <FontAwesomeIcon icon={faBan} onClick={onDeleteTodo} />
          </div>
        </S.Title>
      </S.Header>
      <S.Content state={state}>
        {isEditMode ? (
          <textarea
            value={editContent}
            onChange={onChangeEditContent}
          ></textarea>
        ) : (
          content
        )}
      </S.Content>
    </S.Wrapper>
  );
};
export default OneTodo;

const Wrapper = styled.li`
  width: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid #999;
  margin: 16px 0;
  list-style: none;
  border-radius: 8px;
  background-color: ${({ state, theme }) =>
    state ? theme.PALETTE.gray[100] : theme.PALETTE.white};
`;

const Header = styled.div`
  border-bottom: 1px dotted #999;
  ${flexAlignCenter};
  padding: 8px 16px;
  height: 48px;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & svg {
    cursor: pointer;
    margin-left: 16px;
    :hover {
      transform: scale(1.2);
    }
  }
`;

const StateBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  ${flexCenter};
  color: ${({ state }) => (state ? "#3CB371" : "#999")};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const Content = styled.div`
  padding: 16px;
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & textarea {
    width: 100%;
    height: 100%;
    border: 1px dotted #999;
    outline: none;
    resize: none;
  }
`;

const S = {
  Wrapper,
  Header,
  StateBox,
  Title,
  Content,
};

//  delete, update
//  delete => axios.delete('/todo/3)
//  update => axios.put('todo/3', {content, state}) => 무조건 이 형태로 보내야함
// const updateTodo = async () => {
//   try {
//     let content = editContent;
//     const res = await axiosInstance.put(`todo/${id}`, { content, state });
//     console.log("업데이트 결과", res);
//   } catch (err) {
//     console.log("업데이트 에러", err);
//   }
// };

// const handleTodoDelete = async () => {
//   try {
//     const res = await axiosInstance.delete(`todo/${id}`);
//     console.log("삭제 결과", res);
//     window.location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// };
