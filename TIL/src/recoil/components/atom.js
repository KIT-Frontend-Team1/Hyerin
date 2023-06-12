import { atom } from "recoil";

export const TextState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

//atom은 recoil에서 하나의 상태이다.
//이 값을 변경하면 이를 구독하는 모든 컴포넌트들이 다시 렌더링된다.
//고유한 키값과 디폴트 값을 설정해야 한다.
export const nameState = atom({
  key: "nameState",
  default: "Taylor Swift",
});

export const countState = atom({
  key: "countState", // 전역적으로 고유한 값
  default: 0, // 초깃값
});
