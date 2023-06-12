import { useTodoContext } from "context/todo";
import { useEffect, useState } from "react";

//이걸만드면 어떤 컴포넌트든지 todo를 쓸 수 있다.
//=> 재사용이 가능하다면 만드는 게 맞다.

//axios로직은 axios에만, useTodo에는 api를 사용해서 todo에 관련된
//로직을 정리한다.
const useTodo = () => {
  const [todoList, setTodoList] = useTodoContext();

  //이거는 useTodo가 호출될때마다 실행되는 코드
  //이걸 막기 위해서 전역상태를 사용하고 redux의 미들웨어를 사용한다.
  useEffect(() => {
    //getTodo();
    setTodoList(...todoList);
  }, []);

  const onAddTodo = () => {};
  const onUpdateTodo = () => {};
  return {
    onAddTodo,
    onUpdateTodo,
  };
};

//로직을 분리하면 테스트를 하기가 매우 쉽다
//단점으로는 가독성이 떨어진다. 유지보수도 힘들다
//함수 지향을 따른다면 계속 쪼개는 것이 맞다.
