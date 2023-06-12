import { atom } from "recoil";

const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "show All",
});

export default todoListFilterState;
//
