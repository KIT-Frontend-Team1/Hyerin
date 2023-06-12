import { TextState } from "./atom";
import { selector, useRecoilValue } from "recoil";

function CharacterCount() {
  const charCountState = selector({
    key: "charCountState", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
      const text = get(TextState);

      return text.length;
    },
  });

  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export default CharacterCount;
