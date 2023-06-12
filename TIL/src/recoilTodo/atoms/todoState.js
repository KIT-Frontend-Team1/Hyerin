import { atom } from "recoil";

const todoListState = atom({
  key: "todoListState",
  default: [],
});

export default todoListState;

//원하는 state를 recoil 전용 훅함수에다가 넣어서 사용하면 된다.
//value로 전달할 필요도 묶을 필요도 없다.
