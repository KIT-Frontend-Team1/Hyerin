import { useSetRecoilState } from "recoil";
import { nameState } from "./atom";

const SetName = () => {
  const setName = useSetRecoilState(nameState);
  return <button onClick={() => setName("ariana grande")}>Set name</button>;
};
export default SetName;
