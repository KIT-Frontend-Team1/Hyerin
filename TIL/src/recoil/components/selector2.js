import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

// 두 개의 상태를 정의합니다.
const countAState = atom({
  key: "countA",
  default: 0,
});

const countBState = atom({
  key: "countB",
  default: 0,
});

// 두 개의 상태를 합산하여 계산된 값을 반환하는 selector를 정의합니다.
const totalSelector = selector({
  key: "total",
  get: ({ get }) => {
    const countA = get(countAState);
    const countB = get(countBState);
    return countA + countB;
  },
});

// 상태와 selector를 사용하는 컴포넌트
function Counter() {
  const [countA, setCountA] = useRecoilState(countAState);
  const [countB, setCountB] = useRecoilState(countBState);
  //selector 또한 recoil의 hook을 사용해 가져온다.
  const total = useRecoilValue(totalSelector);

  return (
    <div>
      <div>Count A: {countA}</div>
      <div>Count B: {countB}</div>
      <div>Total: {total}</div>
      <button onClick={() => setCountA(countA + 1)}>Increment A</button>
      <button onClick={() => setCountB(countB + 1)}>Increment B</button>
    </div>
  );
}

export default Counter;
