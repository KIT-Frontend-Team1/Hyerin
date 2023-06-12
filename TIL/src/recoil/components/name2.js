import { useRecoilValue } from "recoil";
import { nameState } from "./atom";

const SomeOtherComponentWithName = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
};

export default SomeOtherComponentWithName;
